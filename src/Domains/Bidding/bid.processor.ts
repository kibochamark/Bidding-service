import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { JOB_NAMES } from "../../queue/constants";
import { Job } from "bullmq";
import { BidJobDto } from "../../queue/dto/bid-dto";
import { BidRepository } from "./bid.repository";

@Processor(JOB_NAMES.PROCESS_BID)
@Injectable()
export class BidProcessor extends WorkerHost {

    private readonly logger = new Logger(BidProcessor.name)

    constructor(private bidRepository: BidRepository) {
        super();
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
            throw error;
        }
    }

}
