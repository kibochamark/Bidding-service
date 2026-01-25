import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { JOB_NAMES } from './constants';
import {Queue} from "bullmq"
import { BidJobDto } from './dto/bid-dto';

@Injectable()
export class QueueService {

    private readonly logger = new Logger(QueueService.name)
    
    constructor(@InjectQueue(JOB_NAMES.PROCESS_BID) private readonly bidQueue:Queue){

    }


    /**
   * Add a bid processing job to the queue
   */
    async addBidProcessingJob(data): Promise<void> {
        try {
            this.logger.log(`received job data ${JSON.stringify(data)}`)
            
            const job = await this.bidQueue.add(JOB_NAMES.PROCESS_BID, data, {
                jobId: data.paymentIntentId, // Use payment intent ID as job ID (prevents duplicates)
            });

            this.logger.log(`Added bid processing job: ${job.id} for auction: ${data.auctionId}`);
        } catch (error) {
            this.logger.error(`Failed to add bid processing job: ${error.message}`, error.stack);
            throw error;
        }
    }


}
