import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PlaceBidDto } from '../../Controllers/Bidding/dto';
import { BidJobDto } from '../../queue/dto/bid-dto';

@Injectable()
export class BidRepository {
    private readonly logger = new Logger(BidRepository.name);
    constructor(private prisma: PrismaService) {}

    /**
     * Place one or more bids from a single payment (used by queue processor).
     * One payment can cover several lowest-unique-bid entries (bidAmounts),
     * each becoming its own Bid row sharing the same paymentIntentId.
     * This is the core logic for the Lowest Unique Bid system with payment tracking.
     *
     * Exactly-once per data.idempotencyKey: Stripe fires several events for one
     * payment (payment_intent.succeeded + charge.succeeded, redeliveries), and this
     * is the durable guard against processing the same payment's bids twice. See
     * ProcessedPayment and src/queue/utils/resolve-stripe-payment.ts.
     */
    async placeBidsWithPayment(data: BidJobDto) {
        this.logger.log(`Processing ${data.bidAmounts.length} paid bid(s) for auction ${data.auctionId} by ${data.bidderName}`);

        // Verify auction exists and is ACTIVE
        const auction = await this.prisma.auction.findUnique({
            where: { id: data.auctionId },
        });

        if (!auction) {
            throw new NotFoundException(`Auction with ID ${data.auctionId} not found`);
        }

        if (auction.status !== 'ACTIVE') {
            throw new BadRequestException(`Auction is not active. Current status: ${auction.status}`);
        }

        // Check if auction has ended - allow a 2-minute grace period for payment processing
        const gracePeriodMs = 2 * 60 * 1000; // 2 minutes
        const auctionEndWithGrace = new Date(auction.endDate.getTime() + gracePeriodMs);
        const now = new Date();
        const isAfterAuctionEnd = now > auction.endDate;
        const isWithinGracePeriod = now <= auctionEndWithGrace;

        if (now > auctionEndWithGrace) {
            throw new BadRequestException('Auction has ended and grace period expired. Bid cannot be placed.');
        }

        // Fast path: this payment was already turned into bids (duplicate webhook
        // event, or a retry of this same job after the bids already committed).
        const alreadyProcessed = await this.prisma.processedPayment.findUnique({
            where: { idempotencyKey: data.idempotencyKey },
        });

        if (alreadyProcessed) {
            this.logger.warn(`Payment ${data.paymentIntentId} (idempotencyKey=${data.idempotencyKey}) already processed at ${alreadyProcessed.processedAt.toISOString()} (${alreadyProcessed.bidCount} bid(s)); skipping duplicate.`);
            const bids = await this.prisma.bid.findMany({ where: { paymentIntentId: data.paymentIntentId } });
            return {
                bids,
                alreadyProcessed: true,
                processedAfterAuctionEnd: isAfterAuctionEnd,
                withinGracePeriod: isWithinGracePeriod,
            };
        }

        // Each bid entry is attributed an equal share of the total payment.
        const perBidShare = data.entryFee;

        try {
            const newBids = await this.prisma.$transaction(async (tx) => {
                // Claim this payment first. A concurrent duplicate (two workers racing
                // on the same payment) blocks on the unique index here and then fails
                // with P2002 once this transaction commits.
                await tx.processedPayment.create({
                    data: {
                        idempotencyKey: data.idempotencyKey,
                        paymentIntentId: data.paymentIntentId,
                        auctionId: data.auctionId,
                        bidderId: data.bidderId,
                        bidCount: data.bidAmounts.length,
                        totalPaid: data.totalPaid,
                        sourceEventId: data.stripeEventId,
                        sourceEventType: data.stripeEventType,
                    },
                });

                const created = [];

                for (const bidAmount of data.bidAmounts) {
                    // Checked against both existing rows AND rows created earlier in this
                    // same batch, since the batch can itself contain duplicate amounts.
                    const existingBidWithSameAmount = await tx.bid.findFirst({
                        where: {
                            auctionId: data.auctionId,
                            bidAmount,
                        }
                    });

                    const isUnique = !existingBidWithSameAmount;

                    const newBid = await tx.bid.create({
                        data: {
                            auctionId: data.auctionId,
                            bidderId: data.bidderId,
                            bidderName: data.bidderName,
                            bidAmount,
                            entryFeePaid: perBidShare,
                            totalPaid: perBidShare,
                            paymentIntentId: data.paymentIntentId,
                            paymentStatus: 'PAID',
                            isUnique,
                        }
                    });

                    if (existingBidWithSameAmount) {
                        await tx.bid.update({
                            where: { id: existingBidWithSameAmount.id },
                            data: { isUnique: false }
                        });
                    }

                    created.push(newBid);
                }

                // Update auction stats inside the same transaction as the bid rows
                // they count, so a failure here rolls back the bids too.
                await tx.auction.update({
                    where: { id: data.auctionId },
                    data: {
                        totalBidsCount: { increment: created.length },
                        totalRevenue: { increment: data.totalPaid }
                    }
                });

                return created;
            });

            this.logger.log(`${newBids.length} bid(s) placed successfully. After auction end: ${isAfterAuctionEnd}, Within grace: ${isWithinGracePeriod}`);

            return {
                bids: newBids,
                alreadyProcessed: false,
                processedAfterAuctionEnd: isAfterAuctionEnd,
                withinGracePeriod: isWithinGracePeriod,
            };
        } catch (error: any) {
            if (error?.code === 'P2002') {
                this.logger.warn(`Concurrent duplicate detected for payment ${data.paymentIntentId} (idempotencyKey=${data.idempotencyKey}); treating as already processed.`);
                const bids = await this.prisma.bid.findMany({ where: { paymentIntentId: data.paymentIntentId } });
                return {
                    bids,
                    alreadyProcessed: true,
                    processedAfterAuctionEnd: isAfterAuctionEnd,
                    withinGracePeriod: isWithinGracePeriod,
                };
            }
            throw error;
        }
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
                        productId:true,
                        prizeValue:true
                    }
                },
                
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
