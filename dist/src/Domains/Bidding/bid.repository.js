"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BidRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BidRepository = BidRepository_1 = class BidRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(BidRepository_1.name);
    }
    async placeBidWithPayment(data) {
        this.logger.log(`Processing paid bid for auction ${data.auctionId} by ${data.bidderName} with amount ${data.bidAmount}`);
        const auction = await this.prisma.auction.findUnique({
            where: { id: data.auctionId },
        });
        if (!auction) {
            throw new common_1.NotFoundException(`Auction with ID ${data.auctionId} not found`);
        }
        if (auction.status !== 'ACTIVE') {
            throw new common_1.BadRequestException(`Auction is not active. Current status: ${auction.status}`);
        }
        const gracePeriodMs = 2 * 60 * 1000;
        const auctionEndWithGrace = new Date(auction.endDate.getTime() + gracePeriodMs);
        const now = new Date();
        const isAfterAuctionEnd = now > auction.endDate;
        const isWithinGracePeriod = now <= auctionEndWithGrace;
        if (now > auctionEndWithGrace) {
            throw new common_1.BadRequestException('Auction has ended and grace period expired. Bid cannot be placed.');
        }
        const existingBidWithSameAmount = await this.prisma.bid.findFirst({
            where: {
                auctionId: data.auctionId,
                bidAmount: data.bidAmount,
            }
        });
        const isUnique = !existingBidWithSameAmount;
        const newBid = await this.prisma.bid.create({
            data: {
                auctionId: data.auctionId,
                bidderId: data.bidderId,
                bidderName: data.bidderName,
                bidAmount: data.bidAmount,
                entryFeePaid: data.entryFee,
                totalPaid: data.totalPaid,
                paymentIntentId: data.paymentIntentId,
                paymentStatus: 'PAID',
                isUnique: isUnique,
            }
        });
        if (existingBidWithSameAmount) {
            await this.prisma.bid.update({
                where: { id: existingBidWithSameAmount.id },
                data: { isUnique: false }
            });
        }
        await this.prisma.auction.update({
            where: { id: data.auctionId },
            data: {
                totalBidsCount: { increment: 1 },
                totalRevenue: { increment: data.totalPaid }
            }
        });
        this.logger.log(`Bid placed successfully. Is unique: ${isUnique}. After auction end: ${isAfterAuctionEnd}, Within grace: ${isWithinGracePeriod}`);
        return {
            ...newBid,
            processedAfterAuctionEnd: isAfterAuctionEnd,
            withinGracePeriod: isWithinGracePeriod,
        };
    }
    async recalculateWinningBid(auctionId) {
        this.logger.log(`Recalculating winning bid for auction ${auctionId}`);
        await this.prisma.bid.updateMany({
            where: { auctionId },
            data: { isWinning: false }
        });
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
            await this.prisma.bid.update({
                where: { id: lowestUniqueBid.id },
                data: { isWinning: true }
            });
            this.logger.log(`Winning bid updated: ${lowestUniqueBid.bidAmount} by ${lowestUniqueBid.bidderName}`);
        }
        else {
            this.logger.log('No unique bids found for this auction');
        }
        return lowestUniqueBid;
    }
    async getBidsByAuctionId(auctionId) {
        this.logger.log(`Fetching bids for auction ${auctionId}`);
        return await this.prisma.bid.findMany({
            where: { auctionId },
            orderBy: { bidAmount: 'asc' }
        });
    }
    async getBidById(id) {
        this.logger.log(`Fetching bid with ID: ${id}`);
        const bid = await this.prisma.bid.findUnique({
            where: { id },
            include: {
                auction: true,
            }
        });
        if (!bid) {
            throw new common_1.NotFoundException(`Bid with ID ${id} not found`);
        }
        return bid;
    }
    async getBidsByBidderId(bidderId) {
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
                        productId: true,
                        prizeValue: true
                    }
                }
            },
            orderBy: { placedAt: 'desc' }
        });
    }
    async getCurrentWinningBid(auctionId) {
        this.logger.log(`Fetching current winning bid for auction ${auctionId}`);
        return await this.prisma.bid.findFirst({
            where: {
                auctionId,
                isWinning: true,
            }
        });
    }
    async getBidStatistics(auctionId) {
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
        const bidGroups = new Map();
        bids.forEach(bid => {
            const amount = bid.bidAmount.toString();
            if (!bidGroups.has(amount)) {
                bidGroups.set(amount, { count: 0, isUnique: bid.isUnique, bidders: [] });
            }
            const group = bidGroups.get(amount);
            group.count += 1;
            group.bidders.push(bid.bidderName);
        });
        const statistics = Array.from(bidGroups.entries()).map(([amount, data]) => ({
            bidAmount: parseFloat(amount),
            count: data.count,
            isUnique: data.isUnique,
            bidders: data.bidders,
        }));
        return statistics;
    }
};
exports.BidRepository = BidRepository;
exports.BidRepository = BidRepository = BidRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BidRepository);
//# sourceMappingURL=bid.repository.js.map