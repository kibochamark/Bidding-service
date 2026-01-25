import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { JOB_NAMES } from './constants';

@Module({
  imports: [
    // forRoot configures the Redis connection globally (only call once in your app)
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 2000,
      },
    }),
    // Register the queue that QueueService will use
    BullModule.registerQueue({
      name: JOB_NAMES.PROCESS_BID,
    }),
  ],
  providers: [QueueService],
  // Export both QueueService AND BullModule so importing modules can use the queue
  exports: [QueueService, BullModule],
})
export class QueueModule {}
