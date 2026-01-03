import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PlaceBidDto } from '../../Controllers/Bidding/dto';

@Injectable()
export class BidRepository {
    private readonly logger = new Logger(BidRepository.name);
    constructor(private prisma: PrismaService) {}

    /**
     * Place a bid in an auction
     * This is the core logic for the Lowest Unique Bid system
     */
    async placeBid(data: PlaceBidDto) {
        this.logger.log(`Placing bid for auction ${data.auctionId} by ${data.bidderName} with amount ${data.bidAmount}`);

        // Verify auction exists and is active
        const auction = await this.prisma.auction.findUnique({
            where: { id: data.auctionId },
        });

        if (!auction) {
            throw new NotFoundException(`Auction with ID ${data.auctionId} not found`);
        }

        if (auction.status !== 'ACTIVE') {
            throw new BadRequestException(`Auction is not active. Current status: ${auction.status}`);
        }

        if (new Date() > auction.endDate) {
            throw new BadRequestException('Auction has ended');
        }

        // Check if bidder already has a bid in this auction
        const existingBid = await this.prisma.bid.findUnique({
            where: {
                auctionId_bidderId: {
                    auctionId: data.auctionId,
                    bidderId: data.bidderId,
                }
            }
        });

        if (existingBid) {
            throw new ConflictException('You can only place ONE bid per auction. Your bid has already been placed.');
        }

        // Check if this bid amount already exists (to determine if it's unique)
        const existingBidWithSameAmount = await this.prisma.bid.findFirst({
            where: {
                auctionId: data.auctionId,
                bidAmount: data.bidAmount,
            }
        });

        const isUnique = !existingBidWithSameAmount;

        // Create the new bid
        const newBid = await this.prisma.bid.create({
            data: {
                auctionId: data.auctionId,
                bidderId: data.bidderId,
                bidderName: data.bidderName,
                bidAmount: data.bidAmount,
                isUnique: isUnique,
            }
        });

        // If a bid with the same amount already exists, mark it as NOT unique
        if (existingBidWithSameAmount) {
            await this.prisma.bid.update({
                where: { id: existingBidWithSameAmount.id },
                data: { isUnique: false }
            });
        }

        // Update auction stats
        await this.prisma.auction.update({
            where: { id: data.auctionId },
            data: {
                totalBidsCount: { increment: 1 },
                totalRevenue: { increment: auction.entryFee }
            }
        });

        // Recalculate which bid is winning
        await this.recalculateWinningBid(data.auctionId);

        this.logger.log(`Bid placed successfully. Is unique: ${isUnique}`);
        return newBid;
    }

    /**
     * Recalculate the winning bid for an auction
     * The winning bid is the LOWEST UNIQUE bid
     */
    async recalculateWinningBid(auctionId: string) {
        this.logger.log(`Recalculating winning bid for auction ${auctionId}`);

        // Reset all bids to not winning
        await this.prisma.bid.updateMany({
            where: { auctionId },
            data: { isWinning: false }
        });

        // Find the lowest unique bid
        const lowestUniqueBid = await this.prisma.bid.findFirst({
            where: {
                auctionId,
                isUnique: true,
            },
            orderBy: {
                bidAmount: 'asc',
            }
        });

        if (lowestUniqueBid) {
            // Mark it as winning
            await this.prisma.bid.update({
                where: { id: lowestUniqueBid.id },
                data: { isWinning: true }
            });

            this.logger.log(`Winning bid updated: ${lowestUniqueBid.bidAmount} by ${lowestUniqueBid.bidderName}`);
        } else {
            this.logger.log('No unique bids found for this auction');
        }

        return lowestUniqueBid;
    }

    /**
     * Get all bids for an auction
     */
    async getBidsByAuctionId(auctionId: string) {
        this.logger.log(`Fetching bids for auction ${auctionId}`);
        return await this.prisma.bid.findMany({
            where: { auctionId },
            orderBy: { bidAmount: 'asc' }
        });
    }

    /**
     * Get a specific bid by ID
     */
    async getBidById(id: string) {
        this.logger.log(`Fetching bid with ID: ${id}`);
        const bid = await this.prisma.bid.findUnique({
            where: { id },
            include: {
                auction: true,
            }
        });

        if (!bid) {
            throw new NotFoundException(`Bid with ID ${id} not found`);
        }

        return bid;
    }

    /**
     * Get all bids placed by a specific bidder
     */
    async getBidsByBidderId(bidderId: string) {
        this.logger.log(`Fetching bids for bidder ${bidderId}`);
        return await this.prisma.bid.findMany({
            where: { bidderId },
            include: {
                auction: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        endDate: true,
                    }
                }
            },
            orderBy: { placedAt: 'desc' }
        });
    }

    /**
     * Get current winning bid for an auction
     */
    async getCurrentWinningBid(auctionId: string) {
        this.logger.log(`Fetching current winning bid for auction ${auctionId}`);
        return await this.prisma.bid.findFirst({
            where: {
                auctionId,
                isWinning: true,
            }
        });
    }

    /**
     * Get bid statistics for an auction (grouped by amount)
     */
    async getBidStatistics(auctionId: string) {
        this.logger.log(`Fetching bid statistics for auction ${auctionId}`);

        const bids = await this.prisma.bid.findMany({
            where: { auctionId },
            select: {
                bidAmount: true,
                isUnique: true,
                bidderName: true,
            },
            orderBy: { bidAmount: 'asc' }
        });

        // Group bids by amount
        const bidGroups = new Map<string, { count: number; isUnique: boolean; bidders: string[] }>();

        bids.forEach(bid => {
            const amount = bid.bidAmount.toString();
            if (!bidGroups.has(amount)) {
                bidGroups.set(amount, { count: 0, isUnique: bid.isUnique, bidders: [] });
            }
            const group = bidGroups.get(amount)!;
            group.count += 1;
            group.bidders.push(bid.bidderName);
        });

        // Convert to array format
        const statistics = Array.from(bidGroups.entries()).map(([amount, data]) => ({
            bidAmount: parseFloat(amount),
            count: data.count,
            isUnique: data.isUnique,
            bidders: data.bidders,
        }));

        return statistics;
    }
}
