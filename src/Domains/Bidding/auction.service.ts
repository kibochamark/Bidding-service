import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AuctionRepository } from './auction.repository';
import { BidRepository } from './bid.repository';
import { CreateAuctionDto, UpdateAuctionDto } from '../../Controllers/Bidding/dto';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { JOB_NAMES, QUEUE_NAMES } from 'src/queue/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuctionService {
    private readonly logger = new Logger(AuctionService.name);

    constructor(
        private auctionRepository: AuctionRepository,
        private bidRepository: BidRepository,
        private prisma: PrismaService,
        @InjectQueue(QUEUE_NAMES.AUCTION_FINALIZATION) private auctionQueue: Queue,
    ) {}

    /**
     * Get all active auctions
     */
    async getActiveAuctions() {
        return await this.auctionRepository.findActiveAuctions();
    }

    /**
     * Get auction by ID
     */
    async getAuctionById(id: string) {
        return await this.auctionRepository.findAuctionById(id);
    }

    /**
     * Create a new auction
     */
    async createAuction(data: CreateAuctionDto) {
        return await this.auctionRepository.createAuction(data);
    }

    /**
     * Update an auction
     */
    async updateAuction(id: string, data: UpdateAuctionDto) {
        return await this.auctionRepository.updateAuction(id, data);
    }

    /**
     * Delete an auction
     */
    async deleteAuction(id: string) {
        return await this.auctionRepository.deleteAuction(id);
    }

    /**
     * Get auction statistics including bid information
     */
    async getAuctionStats(id: string) {
        return await this.auctionRepository.getAuctionStats(id);
    }

    /**
     * Finalize an auction and determine the winner
     * This should be called when the auction ends
     */
    async finalizeAuction(auctionId: string) {
        this.logger.log(`Finalizing auction ${auctionId}`);

        const auction = await this.auctionRepository.findAuctionById(auctionId);

        // Validate auction can be finalized
        if (auction.status === 'WINNER_DETERMINED') {
            throw new BadRequestException('Auction winner has already been determined');
        }

        if (auction.status === 'CANCELLED') {
            throw new BadRequestException('Cannot finalize a cancelled auction');
        }

        if (new Date() < auction.endDate) {
            throw new BadRequestException('Cannot finalize auction before end date');
        }

        // Get the current winning bid (lowest unique bid)
        const winningBid = await this.bidRepository.getCurrentWinningBid(auctionId);

        if (!winningBid) {
            // No winner - no unique bids exist
            this.logger.warn(`No winner for auction ${auctionId} - no unique bids found`);

            await this.auctionRepository.updateAuction(auctionId, {
                status: 'ENDED'
            });

            return {
                auction,
                winner: null,
                message: 'Auction ended with no winner. No unique bids were placed.'
            };
        }

        // Update auction with winner information
        const finalizedAuction = await this.auctionRepository.updateAuction(auctionId, {
            status: 'WINNER_DETERMINED'
        });

        // Update the auction with winner details
        await this.auctionRepository.updateAuction(auctionId, {
            status: 'WINNER_DETERMINED'
        });

        this.logger.log(`Auction ${auctionId} finalized. Winner: ${winningBid.bidderName} with bid amount: ${winningBid.bidAmount}`);

        return {
            auction: finalizedAuction,
            winner: {
                bidderId: winningBid.bidderId,
                bidderName: winningBid.bidderName,
                winningBidAmount: winningBid.bidAmount,
            },
            message: `Congratulations ${winningBid.bidderName}! You won with the lowest unique bid of $${winningBid.bidAmount}`
        };
    }

    /**
     * Get leaderboard for an auction
     * Shows all unique bids in ascending order
     */
    async getAuctionLeaderboard(auctionId: string) {
        this.logger.log(`Fetching leaderboard for auction ${auctionId}`);

        const auction = await this.auctionRepository.findAuctionById(auctionId);
        const statistics = await this.bidRepository.getBidStatistics(auctionId);
        const currentWinner = await this.bidRepository.getCurrentWinningBid(auctionId);

        return {
            auction: {
                id: auction.id,
                title: auction.title,
                status: auction.status,
                endDate: auction.endDate,
                totalBidsCount: auction.totalBidsCount,
            },
            currentWinner: currentWinner ? {
                bidderName: currentWinner.bidderName,
                bidAmount: currentWinner.bidAmount,
            } : null,
            bidStatistics: statistics,
        };
    }



    // Cron job to end auctions when time has expired (runs every minute)
    @Cron('0 * * * * *')
    async endAuctions() {
        const now = new Date();

        this.logger.debug(`[CRON] Checking for ended auctions at ${now.toISOString()}`);

        try {
            // Step 1: Find all active auctions that have passed their end date
            const endedAuctions = await this.prisma.auction.findMany({
                where: {
                    status: 'ACTIVE',
                    endDate: {
                        lte: now
                    }
                },
                select: {
                    id: true,
                    title: true,
                    endDate: true,
                }
            });

            if (endedAuctions.length === 0) {
                this.logger.debug('[CRON] No auctions to finalize');
                return;
            }

            this.logger.log(`[CRON] Found ${endedAuctions.length} auction(s) to finalize`);

            const auctionIds = endedAuctions.map(a => a.id);

            // Step 2: Batch update all auctions to ENDED status
            await this.prisma.auction.updateMany({
                where: {
                    id: { in: auctionIds }
                },
                data: {
                    status: 'ENDED'
                }
            });

            this.logger.log(`[CRON] Updated ${auctionIds.length} auction(s) to ENDED status`);

            // Step 3: Queue a job for each auction to determine winner
            for (const auction of endedAuctions) {
                const job = await this.auctionQueue.add(
                    JOB_NAMES.FINALIZE_AUCTION,
                    {
                        auctionId: auction.id,
                        title: auction.title,
                        endDate: auction.endDate.toISOString(),
                    },
                    {
                        jobId: `finalize-${auction.id}`, // Prevents duplicate jobs
                        attempts: 3,
                        backoff: {
                            type: 'exponential',
                            delay: 1000,
                        },
                    }
                );

                this.logger.log(
                    `[CRON] Queued finalization job ${job.id} for auction: ${auction.title} (ID: ${auction.id})`
                );
            }

        } catch (error) {
            this.logger.error(`[CRON] Error checking for ended auctions: ${error.message}`);
        }
    }
}
