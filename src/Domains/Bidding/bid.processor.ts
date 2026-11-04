import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { JOB_NAMES } from "../../queue/constants";
import { Job } from "bullmq";
import { BidJobDto } from "../../queue/dto/bid-dto";
import { BidRepository } from "./bid.repository";
import { Redis } from 'ioredis';

@Processor(JOB_NAMES.PROCESS_BID)
@Injectable()
export class BidProcessor extends WorkerHost {

    private readonly logger = new Logger(BidProcessor.name)
    private readonly publisher: Redis;

    constructor(private bidRepository: BidRepository) {
        super();
        // Setup a publisher client
        this.publisher = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD!,
        });
    }

    async process(job: Job<BidJobDto, any, string>): Promise<any> {
        this.logger.log(`Processing bid job ${job.id} for auction ${job.data.auctionId} (${job.data.bidAmounts.length} entries)`);

        try {
            const bidData = job.data;

            // Process every bid entry in this payment through the repository
            const result = await this.bidRepository.placeBidsWithPayment(bidData);

            if (result.alreadyProcessed) {
                this.logger.log(`Payment ${bidData.paymentIntentId} was already processed; job ${job.id} is a no-op duplicate.`);
            } else {
                this.logger.log(`${result.bids.length} bid(s) processed successfully: ${result.bids.map((b) => b.id).join(', ')}`);
            }

            // Check if the bids were placed after auction end
            if (result.processedAfterAuctionEnd && result.withinGracePeriod) {
                this.logger.warn(
                    `Bids for payment ${bidData.paymentIntentId} were placed after auction end but within grace period. ` +
                    `Auction: ${bidData.auctionId}, Bidder: ${bidData.bidderName}`
                );
            }

            // Construct the channel name using the bidderId
            const channelName = `payment:${job.data.bidderId}`;

            const payload = {
                type: "payment_success",
                productId: job.data.auctionId,
                productTitle: job.data.auctionTitle,
                message: result.bids.length > 1
                    ? `Your ${result.bids.length} bid entries have been recorded.`
                    : "Your bid entry has been recorded.",
            };

            await this.publisher.publish(channelName, JSON.stringify(payload));

            this.logger.log(`Bid notification sent wiith channel : ${channelName}`)

            return {
                success: true,
                deduped: result.alreadyProcessed,
                bidIds: result.bids.map((b) => b.id),
                count: result.bids.length,
                isUnique: result.bids.map((b) => b.isUnique),
                processedAfterAuctionEnd: result.processedAfterAuctionEnd,
                withinGracePeriod: result.withinGracePeriod,
            };
        } catch (error:any) {
            this.logger.error(`Failed to process bid job ${job.id}: ${error.message}`, error.stack);
            // Publish failure if necessary
            const failChannel = `payment:${job.data.bidderId}`;
            await this.publisher.publish(failChannel, JSON.stringify({
                type: "payment_failed",
                message: error.message
            }));

            this.logger.error(`sending failure message`, error.stack);

            throw error;
        }
    }

}
