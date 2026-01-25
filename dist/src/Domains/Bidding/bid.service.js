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
var BidService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidService = void 0;
const common_1 = require("@nestjs/common");
const bid_repository_1 = require("./bid.repository");
const auction_repository_1 = require("./auction.repository");
let BidService = BidService_1 = class BidService {
    constructor(bidRepository, auctionRepository) {
        this.bidRepository = bidRepository;
        this.auctionRepository = auctionRepository;
        this.logger = new common_1.Logger(BidService_1.name);
        this.paymentIntents = new Map();
    }
    async initiateBidPayment(data) {
        this.logger.log(`Initiating bid payment for auction ${data.auctionId} by ${data.bidderName}`);
        const auction = await this.auctionRepository.findAuctionById(data.auctionId);
        if (!auction) {
            throw new common_1.NotFoundException(`Auction with ID ${data.auctionId} not found`);
        }
        if (auction.status !== 'ACTIVE') {
            throw new common_1.BadRequestException(`Auction is not active. Current status: ${auction.status}`);
        }
        const now = new Date();
        const timeUntilEnd = auction.endDate.getTime() - now.getTime();
        const fiveMinutes = 5 * 60 * 1000;
        if (timeUntilEnd < 0) {
            throw new common_1.BadRequestException('Auction has already ended');
        }
        const minutesRemaining = timeUntilEnd / 1000 / 60;
        const warning = timeUntilEnd < fiveMinutes
            ? `Warning: Auction ends in ${minutesRemaining.toFixed(0)} minutes. Complete payment quickly!`
            : undefined;
        const entryFee = Number(auction.entryFee);
        const totalAmount = entryFee;
        const paymentIntentId = `pi_dummy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const clientSecret = `secret_${paymentIntentId}`;
        this.paymentIntents.set(paymentIntentId, {
            auctionId: data.auctionId,
            bidderId: data.bidderId,
            bidderName: data.bidderName,
            bidAmount: data.bidAmount,
            entryFee: entryFee,
            totalPaid: totalAmount,
            createdAt: now,
            status: 'pending',
        });
        this.logger.log(`Payment intent created: ${paymentIntentId}`);
        return {
            paymentIntentId,
            clientSecret,
            amount: entryFee,
            currency: 'usd',
            auctionId: data.auctionId,
            bidAmount: data.bidAmount,
            entryFee: entryFee,
            totalAmount: totalAmount,
            warning,
            auctionEndTime: auction.endDate,
        };
    }
    async confirmBidPayment(data) {
        this.logger.log(`Confirming payment for intent: ${data.paymentIntentId}`);
        const paymentIntent = this.paymentIntents.get(data.paymentIntentId);
        if (!paymentIntent) {
            throw new common_1.NotFoundException(`Payment intent ${data.paymentIntentId} not found`);
        }
        if (paymentIntent.status === 'confirmed') {
            throw new common_1.BadRequestException('Payment already confirmed');
        }
        if (paymentIntent.status === 'expired') {
            throw new common_1.BadRequestException('Payment intent has expired');
        }
        paymentIntent.status = 'confirmed';
        this.paymentIntents.set(data.paymentIntentId, paymentIntent);
        this.logger.log(`Payment confirmed for auction ${paymentIntent.auctionId}`);
        return {
            success: true,
            message: 'Payment confirmed. Your bid is being processed.',
            paymentIntentId: data.paymentIntentId,
            bidData: {
                paymentIntentId: data.paymentIntentId,
                auctionId: paymentIntent.auctionId,
                bidderId: paymentIntent.bidderId,
                bidderName: paymentIntent.bidderName,
                bidAmount: paymentIntent.bidAmount,
                entryFee: paymentIntent.entryFee,
                totalPaid: paymentIntent.totalPaid,
                paidAt: new Date(),
            }
        };
    }
    async getPaymentIntent(paymentIntentId) {
        const paymentIntent = this.paymentIntents.get(paymentIntentId);
        if (!paymentIntent) {
            throw new common_1.NotFoundException(`Payment intent ${paymentIntentId} not found`);
        }
        return paymentIntent;
    }
    async placeBid(data) {
        return await this.bidRepository.placeBid(data);
    }
    async getBidsByAuctionId(auctionId) {
        return await this.bidRepository.getBidsByAuctionId(auctionId);
    }
    async getBidById(id) {
        return await this.bidRepository.getBidById(id);
    }
    async getBidsByBidderId(bidderId) {
        return await this.bidRepository.getBidsByBidderId(bidderId);
    }
    async getCurrentWinningBid(auctionId) {
        return await this.bidRepository.getCurrentWinningBid(auctionId);
    }
    async getBidStatistics(auctionId) {
        return await this.bidRepository.getBidStatistics(auctionId);
    }
};
exports.BidService = BidService;
exports.BidService = BidService = BidService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bid_repository_1.BidRepository,
        auction_repository_1.AuctionRepository])
], BidService);
//# sourceMappingURL=bid.service.js.map