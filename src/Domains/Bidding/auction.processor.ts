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
            // Skip if winner already determined
            const auction = await this.auctionRepository.findAuctionById(auctionId);
            if (auction.status === 'WINNER_DETERMINED') {
                this.logger.log(`[JOB ${job.id}] Auction ${auctionId} already has a winner, skipping`);
                return { success: true, auctionId, skipped: true, message: 'Winner already determined' };
            }

            // Step 1: Recalculate the winning bid (finds lowest unique bid and marks it)
            const winningBid = await this.bidRepository.recalculateWinningBid(auctionId);

            if (!winningBid) {
                this.logger.warn(`[JOB ${job.id}] No winner for auction ${auctionId} - no unique bids found`);

                await this.auctionRepository.updateAuction(auctionId, {
                    status: 'ENDED',
                });

                return {
                    success: true,
                    auctionId,
                    winner: null,
                    message: 'Auction ended with no winner',
                };
            }

            // Step 2: Update auction with winner details
            await this.auctionRepository.updateAuction(auctionId, {
                status: 'WINNER_DETERMINED',
                winnerId: winningBid.bidderId,
                winningBidAmount: winningBid.bidAmount,
            });

            this.logger.log(
                `[JOB ${job.id}] Auction ${auctionId} finalized. ` +
                `Winner: ${winningBid.bidderName} with bid $${winningBid.bidAmount}`
            );

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
