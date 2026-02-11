import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { JOB_NAMES, QUEUE_NAMES } from './constants';

@Module({
  imports: [
    // forRoot configures the Redis connection globally (only call once in your app)
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis-service', // Use env var with fallback
        port: parseInt(process.env.REDIS_PORT as string) || 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 2000,
      },
    }),
    // Register queues
    BullModule.registerQueue(
      { name: JOB_NAMES.PROCESS_BID },
      { name: QUEUE_NAMES.AUCTION_FINALIZATION },
    ),
  ],
  providers: [QueueService],
  // Export both QueueService AND BullModule so importing modules can use the queue
  exports: [QueueService, BullModule],
})
export class QueueModule {}
