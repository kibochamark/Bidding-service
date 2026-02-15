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
            password: process.env.REDIS_PASSWORD,
        });
    }

    async process(job: Job<BidJobDto, any, string>): Promise<any> {
        this.logger.log(`Processing bid job ${job.id} for auction ${job.data.auctionId}`);

        try {
            const bidData = job.data;

            // Process the bid through the repository
            const result = await this.bidRepository.placeBidWithPayment(bidData);

            this.logger.log(`Bid processed successfully: ${result.id}`);

            // Check if the bid was placed after auction end
            if (result.processedAfterAuctionEnd && result.withinGracePeriod) {
                this.logger.warn(
                    `Bid ${result.id} was placed after auction end but within grace period. ` +
                    `Auction: ${bidData.auctionId}, Bidder: ${bidData.bidderName}`
                );
            }

            // Construct the channel name using the bidderId
            const channelName = `payment:${job.data.bidderId}`;

            const payload = {
                type: "payment_success",
                productId: job.data.auctionId,
                productTitle: job.data.auctionTitle, // Ensure this exists in your DTO
                message: "Your bid entry has been recorded."
            };

            await this.publisher.publish(channelName, JSON.stringify(payload));

            this.logger.log(`Bid notification sent wiith channel : ${channelName}`)

            return {
                success: true,
                bidId: result.id,
                isUnique: result.isUnique,
                isWinning: result.isWinning,
                processedAfterAuctionEnd: result.processedAfterAuctionEnd,
                withinGracePeriod: result.withinGracePeriod,
            };
        } catch (error) {
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
