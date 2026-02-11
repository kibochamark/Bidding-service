import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { QUEUE_NAMES } from '../../queue/constants';
import { Job } from 'bullmq';
import { BidRepository } from './bid.repository';
import { AuctionRepository } from './auction.repository';

export interface AuctionFinalizationJobDto {
    auctionId: string;
    title: string;
    endDate: string;
}

@Processor(QUEUE_NAMES.AUCTION_FINALIZATION)
@Injectable()
export class AuctionProcessor extends WorkerHost {
    private readonly logger = new Logger(AuctionProcessor.name);

    constructor(
        private bidRepository: BidRepository,
        private auctionRepository: AuctionRepository,
    ) {
        super();
    }

    async process(job: Job<AuctionFinalizationJobDto>): Promise<any> {
        const { auctionId, title } = job.data;

        this.logger.log(`[JOB ${job.id}] Processing finalization for auction: ${title} (${auctionId})`);

        try {
            // Get the current winning bid (lowest unique bid)
            const winningBid = await this.bidRepository.getCurrentWinningBid(auctionId);

            if (!winningBid) {
                this.logger.warn(`[JOB ${job.id}] No winner for auction ${auctionId} - no unique bids found`);

                return {
                    success: true,
                    auctionId,
                    winner: null,
                    message: 'Auction ended with no winner',
                };
            }

            // Update auction with winner information
            await this.auctionRepository.updateAuction(auctionId, {
                status: 'WINNER_DETERMINED',
            });

            this.logger.log(
                `[JOB ${job.id}] Auction ${auctionId} finalized. ` +
                `Winner: ${winningBid.bidderName} with bid $${winningBid.bidAmount}`
            );

            // TODO: Emit events for notifications
            // - Email to winner
            // - Webhook to Next.js for revalidation

            return {
                success: true,
                auctionId,
                winner: {
                    bidderId: winningBid.bidderId,
                    bidderName: winningBid.bidderName,
                    winningBidAmount: winningBid.bidAmount,
                },
                message: `Winner determined: ${winningBid.bidderName}`,
            };

        } catch (error) {
            this.logger.error(
                `[JOB ${job.id}] Failed to finalize auction ${auctionId}: ${error.message}`,
                error.stack
            );
            throw error;
        }
    }
}
