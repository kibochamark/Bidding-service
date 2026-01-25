# BullMQ Setup Guide - Complete Tutorial

## What is BullMQ?

BullMQ is a **Node.js queue system** built on top of Redis. Think of it as a task manager that:
- Takes jobs from one part of your app (producer)
- Stores them in Redis
- Processes them in the background (consumer/worker)
- Handles retries, failures, and monitoring

### Real-World Analogy
Imagine a restaurant:
- **Customer orders food** = Producer (adds job to queue)
- **Order ticket in kitchen** = Queue (stored in Redis)
- **Chef cooks the order** = Worker (processes the job)
- **Kitchen can handle multiple orders** = Multiple workers

## Why Use BullMQ?

### Without BullMQ (Synchronous)
```typescript
// Stripe webhook handler
async handleWebhook(event) {
  // Must finish in < 5 seconds or Stripe retries
  await validatePayment();     // 500ms
  await checkKYC();            // 1s
  await createBid();           // 2s
  await calculateWinner();     // 3s
  // Total: 6.5s ❌ TOO SLOW! Webhook times out
}
```

### With BullMQ (Asynchronous)
```typescript
// Stripe webhook handler
async handleWebhook(event) {
  await queue.add('process-bid', event.data);  // 10ms ✅
  return { received: true };  // Fast response!
}

// Background worker (runs separately)
async processBid(job) {
  await validatePayment();     // 500ms
  await checkKYC();            // 1s
  await createBid();           // 2s
  await calculateWinner();     // 3s
  // Total: 6.5s - but webhook already responded!
}
```

---

## Step 1: Install Dependencies

```bash
npm install bullmq ioredis stripe
npm install --save-dev @types/ioredis
```

**What each does:**
- `bullmq`: Queue management library
- `ioredis`: Redis client for Node.js (BullMQ uses this internally)
- `stripe`: Stripe payment SDK
- `@types/ioredis`: TypeScript types

---

## Step 2: Setup Redis

### Local Development (Docker)

Create or update `docker-compose.yml`:
```yaml
version: '3.8'

services:
  biddingservice:
    image: postgres:16
    # ... your existing postgres config

  redis:
    image: redis:7-alpine
    container_name: bidding-redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
  redis-data:  # Add this
```

Start Redis:
```bash
docker compose up -d redis
```

### Environment Variables

Add to your `.env`:
```bash
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=  # Leave empty for local dev
REDIS_DB=0

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 3: Create BullMQ Module Structure

### File Structure
```
src/
├── queue/
│   ├── queue.module.ts        # Module definition
│   ├── queue.service.ts       # Producer (adds jobs)
│   ├── processors/
│   │   └── bid.processor.ts   # Consumer (processes jobs)
│   ├── dto/
│   │   └── bid-job.dto.ts     # Job data structure
│   └── constants.ts           # Queue names
```

---

## Step 4: Create Redis Configuration

**File:** `src/config/redis.config.ts`

```typescript
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'bullmq';

export const getRedisConfig = (configService: ConfigService): ConnectionOptions => {
  return {
    host: configService.get<string>('REDIS_HOST', 'localhost'),
    port: configService.get<number>('REDIS_PORT', 6379),
    password: configService.get<string>('REDIS_PASSWORD'),
    db: configService.get<number>('REDIS_DB', 0),
    maxRetriesPerRequest: null, // Important for BullMQ
    enableReadyCheck: false,    // Important for BullMQ
  };
};
```

**Why these settings?**
- `maxRetriesPerRequest: null` - BullMQ handles retries itself
- `enableReadyCheck: false` - Faster connection

---

## Step 5: Create Queue Constants

**File:** `src/queue/constants.ts`

```typescript
export const QUEUE_NAMES = {
  BID_PROCESSING: 'bid-processing',
  // Add more queues here as needed
  // EMAIL_NOTIFICATIONS: 'email-notifications',
  // AUCTION_ENDING: 'auction-ending',
} as const;

export const JOB_NAMES = {
  PROCESS_BID: 'process-bid',
  RECALCULATE_WINNER: 'recalculate-winner',
} as const;
```

---

## Step 6: Create Job DTO

**File:** `src/queue/dto/bid-job.dto.ts`

```typescript
import { IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class BidJobDto {
  @IsString()
  paymentIntentId: string;

  @IsUUID()
  auctionId: string;

  @IsUUID()
  bidderId: string;

  @IsString()
  bidderName: string;

  @IsNumber()
  bidAmount: number;

  @IsNumber()
  entryFee: number;

  @IsNumber()
  totalPaid: number;

  @IsDateString()
  paidAt: Date;
}
```

---

## Step 7: Create Queue Service (Producer)

**File:** `src/queue/queue.service.ts`

```typescript
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { getRedisConfig } from '../config/redis.config';
import { QUEUE_NAMES, JOB_NAMES } from './constants';
import { BidJobDto } from './dto/bid-job.dto';

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueueService.name);
  private bidQueue: Queue;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Initialize queue connection when module starts
   */
  async onModuleInit() {
    const redisConfig = getRedisConfig(this.configService);

    // Create the bid processing queue
    this.bidQueue = new Queue(QUEUE_NAMES.BID_PROCESSING, {
      connection: redisConfig,
      defaultJobOptions: {
        attempts: 3,              // Retry failed jobs 3 times
        backoff: {
          type: 'exponential',    // Wait longer between each retry
          delay: 1000,            // First retry after 1s, then 2s, then 4s
        },
        removeOnComplete: {
          age: 24 * 3600,         // Keep completed jobs for 24 hours
          count: 1000,            // Keep max 1000 completed jobs
        },
        removeOnFail: {
          age: 7 * 24 * 3600,     // Keep failed jobs for 7 days
        },
      },
    });

    this.logger.log('BullMQ Queue initialized successfully');
  }

  /**
   * Clean up connections when app shuts down
   */
  async onModuleDestroy() {
    await this.bidQueue.close();
    this.logger.log('BullMQ Queue closed');
  }

  /**
   * Add a bid processing job to the queue
   */
  async addBidProcessingJob(data: BidJobDto): Promise<void> {
    try {
      const job = await this.bidQueue.add(JOB_NAMES.PROCESS_BID, data, {
        jobId: data.paymentIntentId, // Use payment intent ID as job ID (prevents duplicates)
      });

      this.logger.log(`Added bid processing job: ${job.id} for auction: ${data.auctionId}`);
    } catch (error) {
      this.logger.error(`Failed to add bid processing job: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get queue instance (useful for monitoring)
   */
  getBidQueue(): Queue {
    return this.bidQueue;
  }

  /**
   * Get queue stats (for admin dashboard)
   */
  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.bidQueue.getWaitingCount(),
      this.bidQueue.getActiveCount(),
      this.bidQueue.getCompletedCount(),
      this.bidQueue.getFailedCount(),
      this.bidQueue.getDelayedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
      total: waiting + active + completed + failed + delayed,
    };
  }
}
```

**Key Concepts:**

1. **Queue Creation**: `new Queue(name, options)`
   - Name: Unique identifier for this queue
   - Options: Redis connection + job defaults

2. **Job Options**:
   - `attempts`: How many times to retry if job fails
   - `backoff`: How long to wait between retries
   - `removeOnComplete`: Auto-cleanup completed jobs
   - `jobId`: Prevents duplicate jobs (idempotency)

3. **Lifecycle Hooks**:
   - `onModuleInit`: Run when NestJS module starts
   - `onModuleDestroy`: Run when app shuts down (cleanup)

---

## Step 8: Create Bid Processor (Consumer/Worker)

**File:** `src/queue/processors/bid.processor.ts`

```typescript
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUE_NAMES, JOB_NAMES } from '../constants';
import { BidJobDto } from '../dto/bid-job.dto';
import { BidRepository } from '../../Domains/Bidding/bid.repository';
import { AuctionRepository } from '../../Domains/Bidding/auction.repository';
import { AccountRepository } from '../../Domains/Accounts/account.repository';
import { KycStatus, AuctionStatus } from '../../../generated/prisma/client';

@Processor(QUEUE_NAMES.BID_PROCESSING, {
  concurrency: 5, // Process 5 jobs simultaneously
})
export class BidProcessor extends WorkerHost {
  private readonly logger = new Logger(BidProcessor.name);

  constructor(
    private readonly bidRepo: BidRepository,
    private readonly auctionRepo: AuctionRepository,
    private readonly accountRepo: AccountRepository,
  ) {
    super();
  }

  /**
   * Main job processing method
   */
  async process(job: Job<BidJobDto>): Promise<any> {
    const data = job.data;

    this.logger.log(`Processing bid job ${job.id} for auction ${data.auctionId}`);

    try {
      // Step 1: Validate payment hasn't been processed already (idempotency)
      const existingBid = await this.bidRepo.findByPaymentIntent(data.paymentIntentId);
      if (existingBid) {
        this.logger.warn(`Bid already exists for payment intent: ${data.paymentIntentId}`);
        return { alreadyProcessed: true, bidId: existingBid.id };
      }

      // Step 2: Validate auction is still active
      const auction = await this.auctionRepo.findById(data.auctionId);
      if (!auction) {
        throw new Error(`Auction ${data.auctionId} not found`);
      }

      if (auction.status !== AuctionStatus.ACTIVE) {
        throw new Error(`Auction ${data.auctionId} is not active (status: ${auction.status})`);
      }

      if (new Date() > auction.endDate) {
        throw new Error(`Auction ${data.auctionId} has ended`);
      }

      // Step 3: Verify user is KYC verified
      const account = await this.accountRepo.findByKindeId(data.bidderId);
      if (!account) {
        throw new Error(`Account ${data.bidderId} not found`);
      }

      if (!account.kyc || account.kyc.status !== KycStatus.VERIFIED) {
        throw new Error(`User ${data.bidderId} is not KYC verified (status: ${account.kyc?.status})`);
      }

      // Step 4: Create the bid
      const bid = await this.bidRepo.createBidFromPayment({
        auctionId: data.auctionId,
        bidderId: data.bidderId,
        bidderName: data.bidderName,
        bidAmount: data.bidAmount,
        entryFeePaid: data.entryFee,
        totalPaid: data.totalPaid,
        paymentIntentId: data.paymentIntentId,
        placedAt: new Date(data.paidAt),
      });

      this.logger.log(`Created bid ${bid.id} for auction ${data.auctionId}`);

      // Step 5: Check uniqueness and update other bids if needed
      await this.bidRepo.updateBidUniqueness(data.auctionId, data.bidAmount);

      // Step 6: Update auction statistics
      await this.auctionRepo.incrementStats(data.auctionId, data.totalPaid);

      // Step 7: Recalculate winner
      const winner = await this.bidRepo.recalculateWinner(data.auctionId);
      if (winner) {
        this.logger.log(`New winner for auction ${data.auctionId}: Bid ${winner.id} (${winner.bidAmount})`);
      }

      return {
        success: true,
        bidId: bid.id,
        isWinning: bid.isWinning,
      };

    } catch (error) {
      this.logger.error(
        `Failed to process bid job ${job.id}: ${error.message}`,
        error.stack,
      );
      throw error; // BullMQ will retry based on job options
    }
  }

  /**
   * Event: Job completed successfully
   */
  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    const { id, returnvalue } = job;
    this.logger.log(`Job ${id} completed successfully. Result: ${JSON.stringify(returnvalue)}`);
  }

  /**
   * Event: Job failed after all retries
   */
  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    const { id, attemptsMade, data } = job;
    this.logger.error(
      `Job ${id} failed after ${attemptsMade} attempts. ` +
      `Auction: ${data.auctionId}, Error: ${error.message}`,
      error.stack,
    );
    // TODO: Send alert to admin, notify user, maybe refund payment
  }

  /**
   * Event: Job is active (being processed)
   */
  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.debug(`Job ${job.id} is now active`);
  }
}
```

**Key Concepts:**

1. **@Processor Decorator**:
   - Tells NestJS this class processes jobs from a specific queue
   - `concurrency: 5` means 5 jobs can be processed simultaneously

2. **process() Method**:
   - Main entry point for job processing
   - Receives `Job` object containing data
   - Return value is stored as job result
   - Throw error to trigger retry

3. **Event Handlers**:
   - `@OnWorkerEvent('completed')`: Job succeeded
   - `@OnWorkerEvent('failed')`: Job failed after all retries
   - `@OnWorkerEvent('active')`: Job started processing

---

## Step 9: Create Queue Module

**File:** `src/queue/queue.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';
import { BidProcessor } from './processors/bid.processor';
import { getRedisConfig } from '../config/redis.config';
import { QUEUE_NAMES } from './constants';

// Import repositories needed by processor
import { BidModule } from '../Domains/Bidding/bid.module';
import { AuctionModule } from '../Domains/Bidding/auction.module';
import { AccountModule } from '../Domains/Accounts/account.module';

@Module({
  imports: [
    ConfigModule,

    // Register BullMQ with Redis connection
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: getRedisConfig(configService),
      }),
      inject: [ConfigService],
    }),

    // Register specific queues
    BullModule.registerQueue({
      name: QUEUE_NAMES.BID_PROCESSING,
    }),

    // Import modules with repositories
    BidModule,
    AuctionModule,
    AccountModule,
  ],
  providers: [
    QueueService,
    BidProcessor,
  ],
  exports: [
    QueueService, // Export so other modules can use it
  ],
})
export class QueueModule {}
```

---

## Step 10: Register Queue Module in App

**File:** `src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QueueModule,  // Add this
    // ... other modules
  ],
})
export class AppModule {}
```

---

## How to Use the Queue

### Example: Stripe Webhook Handler

**File:** `src/Controllers/Webhooks/stripe-webhook.controller.ts`

```typescript
import { Controller, Post, Body, Headers, Logger } from '@nestjs/common';
import { QueueService } from '../../queue/queue.service';
import Stripe from 'stripe';

@Controller('webhooks')
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);
  private stripe: Stripe;

  constructor(private readonly queueService: QueueService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  @Post('stripe')
  async handleStripeWebhook(
    @Body() rawBody: Buffer,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      return { error: 'Invalid signature' };
    }

    // Handle payment success
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Check if this is a bid payment
      if (paymentIntent.metadata.type === 'auction_bid') {
        // Add job to queue (fast!)
        await this.queueService.addBidProcessingJob({
          paymentIntentId: paymentIntent.id,
          auctionId: paymentIntent.metadata.auctionId,
          bidderId: paymentIntent.metadata.bidderId,
          bidderName: paymentIntent.metadata.bidderName,
          bidAmount: parseFloat(paymentIntent.metadata.bidAmount),
          entryFee: parseFloat(paymentIntent.metadata.entryFee),
          totalPaid: paymentIntent.amount / 100, // Convert cents to dollars
          paidAt: new Date(),
        });

        this.logger.log(`Queued bid processing for payment: ${paymentIntent.id}`);
      }
    }

    return { received: true }; // Quick response!
  }
}
```

---

## Monitoring Your Queues

### Check Queue Stats

```typescript
// In any service
const stats = await this.queueService.getQueueStats();
console.log(stats);
// Output:
// {
//   waiting: 5,
//   active: 2,
//   completed: 1543,
//   failed: 12,
//   delayed: 0,
//   total: 1562
// }
```

### BullMQ Dashboard (Optional)

Install Bull Board for a web UI:

```bash
npm install @bull-board/api @bull-board/nestjs
```

```typescript
// In queue.module.ts
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    // ... existing imports
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter
    }),
    BullBoardModule.forFeature({
      name: QUEUE_NAMES.BID_PROCESSING,
      adapter: BullMQAdapter,
    }),
  ],
})
```

Visit: `http://localhost:3000/admin/queues`

---

## Testing

### 1. Test Queue Connection

```typescript
// test-queue.spec.ts
import { Test } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { ConfigModule } from '@nestjs/config';

describe('QueueService', () => {
  let service: QueueService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [QueueService],
    }).compile();

    service = module.get<QueueService>(QueueService);
    await service.onModuleInit();
  });

  afterAll(async () => {
    await service.onModuleDestroy();
  });

  it('should add job to queue', async () => {
    await service.addBidProcessingJob({
      paymentIntentId: 'test-pi-123',
      auctionId: 'auction-123',
      bidderId: 'user-123',
      bidderName: 'Test User',
      bidAmount: 50,
      entryFee: 5,
      totalPaid: 55,
      paidAt: new Date(),
    });

    const stats = await service.getQueueStats();
    expect(stats.total).toBeGreaterThan(0);
  });
});
```

### 2. Manual Testing

```bash
# Check Redis is running
docker ps | grep redis

# Connect to Redis CLI
docker exec -it bidding-redis redis-cli

# Check queues
KEYS bull:*

# Check job count
LLEN bull:bid-processing:wait

# View job data
LRANGE bull:bid-processing:wait 0 -1
```

---

## Summary

**What We Built:**

1. ✅ **QueueService** (Producer): Adds jobs to queue
2. ✅ **BidProcessor** (Consumer): Processes jobs in background
3. ✅ **Redis Connection**: Stores queue data
4. ✅ **Error Handling**: Auto-retry failed jobs
5. ✅ **Monitoring**: Track queue stats

**Next Steps:**

1. Update Prisma schema for payment tracking
2. Implement bid repository methods
3. Create webhook controller
4. Test end-to-end flow

**Key Takeaways:**

- Queue = Fast webhook response + reliable background processing
- Producer = Adds jobs (webhook handler)
- Consumer = Processes jobs (bid processor)
- Redis = Storage for queue data
- BullMQ = Handles retry logic, monitoring, scaling
