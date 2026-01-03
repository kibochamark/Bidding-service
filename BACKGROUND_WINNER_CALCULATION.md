# Background Winner Calculation Options

## Current Implementation (Real-time)

Currently, `recalculateWinningBid()` is called immediately after every bid is placed ([bid.repository.ts:86](src/Domains/Bidding/bid.repository.ts#L86)).

**Pros:**
- ✅ Always up-to-date
- ✅ Simple implementation

**Cons:**
- ❌ Slows down bid placement
- ❌ Extra database queries on every bid
- ❌ Not scalable for high-traffic auctions

---

## Option A: Lazy Calculation (Simple)

Calculate the winner **only when requested** (e.g., when viewing leaderboard or finalizing auction).

### Implementation

**Step 1:** Remove real-time calculation from bid placement

**Step 2:** Calculate winner on-demand in these scenarios:
- When viewing `/auctions/:id/leaderboard`
- When finalizing auction
- When viewing current winning bid

**Changes Needed:**
```typescript
// In bid.repository.ts - placeBid()
// Remove this line:
await this.recalculateWinningBid(data.auctionId);

// In auction.service.ts - getAuctionLeaderboard()
async getAuctionLeaderboard(auctionId: string) {
    // Add this line to calculate winner on-demand
    await this.bidRepository.recalculateWinningBid(auctionId);

    // ... rest of the method
}
```

**Pros:**
- ✅ Faster bid placement
- ✅ No code dependencies needed
- ✅ Simple to implement

**Cons:**
- ❌ Winner info might be stale
- ❌ Extra latency when viewing leaderboard

---

## Option B: Background Queue (Production-Ready)

Use **BullMQ** (recommended for NestJS) to process winner calculations in the background.

### Architecture

```
Bid Placed → Add Job to Queue → Background Worker → Calculate Winner
```

### Implementation Steps

#### 1. Install Dependencies

```bash
npm install @nestjs/bull bull
npm install -D @types/bull
```

#### 2. Setup Redis (Required for Bull)

```bash
# Using Docker
docker run -d -p 6379:6379 redis:alpine

# Or install Redis locally
brew install redis  # macOS
```

#### 3. Create Background Job Processor

**File:** `src/Domains/Bidding/processors/winner-calculation.processor.ts`

```typescript
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { BidRepository } from '../bid.repository';

@Processor('winner-calculation')
export class WinnerCalculationProcessor {
    private readonly logger = new Logger(WinnerCalculationProcessor.name);

    constructor(private bidRepository: BidRepository) {}

    @Process('recalculate')
    async handleRecalculation(job: Job<{ auctionId: string }>) {
        this.logger.log(`Processing winner calculation for auction: ${job.data.auctionId}`);

        try {
            await this.bidRepository.recalculateWinningBid(job.data.auctionId);
            this.logger.log(`Winner calculated for auction: ${job.data.auctionId}`);
        } catch (error) {
            this.logger.error(`Failed to calculate winner for auction: ${job.data.auctionId}`, error);
            throw error; // Bull will retry
        }
    }
}
```

#### 4. Update Bid Repository to Use Queue

**File:** `src/Domains/Bidding/bid.repository.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BidRepository {
    private readonly logger = new Logger(BidRepository.name);

    constructor(
        private prisma: PrismaService,
        @InjectQueue('winner-calculation') private winnerQueue: Queue,
    ) {}

    async placeBid(data: PlaceBidDto) {
        // ... existing bid placement logic ...

        // Remove direct call:
        // await this.recalculateWinningBid(data.auctionId);

        // Add to queue instead:
        await this.winnerQueue.add('recalculate',
            { auctionId: data.auctionId },
            {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000,
                },
                removeOnComplete: true,
            }
        );

        return newBid;
    }
}
```

#### 5. Update Bidding Module

**File:** `src/Domains/Bidding/bidding.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from '../../prisma/prisma.service';
import { AuctionController } from '../../Controllers/Bidding/auction.controller';
import { BidController } from '../../Controllers/Bidding/bid.controller';
import { AuctionService } from './auction.service';
import { BidService } from './bid.service';
import { AuctionRepository } from './auction.repository';
import { BidRepository } from './bid.repository';
import { WinnerCalculationProcessor } from './processors/winner-calculation.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'winner-calculation',
        }),
    ],
    controllers: [AuctionController, BidController],
    providers: [
        PrismaService,
        AuctionService,
        BidService,
        AuctionRepository,
        BidRepository,
        WinnerCalculationProcessor,
    ],
    exports: [AuctionService, BidService],
})
export class BiddingModule {}
```

#### 6. Register Bull in App Module

**File:** `src/app.module.ts`

```typescript
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    AccountModule,
    ProductModule,
    BiddingModule,
    PrismaModule,
  ],
})
export class AppModule {}
```

### Pros of Background Queue:
- ✅ **Extremely fast** bid placement
- ✅ **Scalable** - handles high traffic
- ✅ **Resilient** - automatic retries on failure
- ✅ **Monitoring** - can track job status
- ✅ **Priority queues** - can prioritize certain auctions
- ✅ **Delayed jobs** - can schedule recalculation

### Cons:
- ❌ Requires Redis
- ❌ More complex setup
- ❌ Winner info has slight delay (usually <1 second)

---

## Option C: Scheduled Background Job (Cron)

Calculate winners periodically (e.g., every 30 seconds) instead of on every bid.

### Implementation

```bash
npm install @nestjs/schedule
```

**File:** `src/Domains/Bidding/services/winner-calculation.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BidRepository } from '../bid.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WinnerCalculationService {
    private readonly logger = new Logger(WinnerCalculationService.name);

    constructor(
        private prisma: PrismaService,
        private bidRepository: BidRepository,
    ) {}

    @Cron(CronExpression.EVERY_30_SECONDS)
    async recalculateAllActiveAuctions() {
        this.logger.log('Starting scheduled winner recalculation...');

        const activeAuctions = await this.prisma.auction.findMany({
            where: {
                status: 'ACTIVE',
                endDate: { gte: new Date() }
            },
            select: { id: true }
        });

        for (const auction of activeAuctions) {
            try {
                await this.bidRepository.recalculateWinningBid(auction.id);
            } catch (error) {
                this.logger.error(`Failed to recalculate winner for ${auction.id}`, error);
            }
        }

        this.logger.log(`Recalculated winners for ${activeAuctions.length} auctions`);
    }
}
```

**Update bidding.module.ts:**

```typescript
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ScheduleModule.forRoot()],
    // ... rest
    providers: [
        // ... existing providers
        WinnerCalculationService,
    ],
})
export class BiddingModule {}
```

### Pros:
- ✅ Simple to implement
- ✅ No Redis required
- ✅ Fast bid placement
- ✅ Batched processing

### Cons:
- ❌ Winner info can be up to 30 seconds stale
- ❌ Unnecessary work if no new bids
- ❌ Can't scale to thousands of auctions

---

## Recommendation

| Scenario | Recommended Approach |
|----------|---------------------|
| **Low traffic (<100 bids/minute)** | Keep current real-time calculation |
| **Medium traffic (100-1000 bids/minute)** | Use **Option A (Lazy Calculation)** |
| **High traffic (>1000 bids/minute)** | Use **Option B (Bull Queue)** |
| **Fixed schedule needs** | Use **Option C (Cron)** |

## Performance Comparison

| Approach | Bid Placement Speed | Winner Accuracy | Complexity |
|----------|-------------------|----------------|------------|
| Current (Real-time) | Slow (~200ms) | Real-time | Low |
| Lazy Calculation | Fast (~50ms) | On-demand | Low |
| Bull Queue | Very Fast (~30ms) | <1s delay | Medium |
| Cron Job | Very Fast (~30ms) | Up to 30s delay | Low |

---

## Migration Path

If you want to move to background processing:

1. **Start with Lazy Calculation** (easiest, no dependencies)
2. **Monitor performance**
3. **If needed, upgrade to Bull Queue** for production scale

Would you like me to implement any of these options?
