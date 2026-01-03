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
var AuctionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionService = void 0;
const common_1 = require("@nestjs/common");
const auction_repository_1 = require("./auction.repository");
const bid_repository_1 = require("./bid.repository");
let AuctionService = AuctionService_1 = class AuctionService {
    constructor(auctionRepository, bidRepository) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
        this.logger = new common_1.Logger(AuctionService_1.name);
    }
    async getActiveAuctions() {
        return await this.auctionRepository.findActiveAuctions();
    }
    async getAuctionById(id) {
        return await this.auctionRepository.findAuctionById(id);
    }
    async createAuction(data) {
        return await this.auctionRepository.createAuction(data);
    }
    async updateAuction(id, data) {
        return await this.auctionRepository.updateAuction(id, data);
    }
    async deleteAuction(id) {
        return await this.auctionRepository.deleteAuction(id);
    }
    async getAuctionStats(id) {
        return await this.auctionRepository.getAuctionStats(id);
    }
    async finalizeAuction(auctionId) {
        this.logger.log(`Finalizing auction ${auctionId}`);
        const auction = await this.auctionRepository.findAuctionById(auctionId);
        if (auction.status === 'WINNER_DETERMINED') {
            throw new common_1.BadRequestException('Auction winner has already been determined');
        }
        if (auction.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Cannot finalize a cancelled auction');
        }
        if (new Date() < auction.endDate) {
            throw new common_1.BadRequestException('Cannot finalize auction before end date');
        }
        const winningBid = await this.bidRepository.getCurrentWinningBid(auctionId);
        if (!winningBid) {
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
        const finalizedAuction = await this.auctionRepository.updateAuction(auctionId, {
            status: 'WINNER_DETERMINED'
        });
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
    async getAuctionLeaderboard(auctionId) {
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
};
exports.AuctionService = AuctionService;
exports.AuctionService = AuctionService = AuctionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auction_repository_1.AuctionRepository,
        bid_repository_1.BidRepository])
], AuctionService);
//# sourceMappingURL=auction.service.js.map