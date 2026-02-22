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
var AuctionProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../queue/constants");
const bid_repository_1 = require("./bid.repository");
const auction_repository_1 = require("./auction.repository");
let AuctionProcessor = AuctionProcessor_1 = class AuctionProcessor extends bullmq_1.WorkerHost {
    constructor(bidRepository, auctionRepository) {
        super();
        this.bidRepository = bidRepository;
        this.auctionRepository = auctionRepository;
        this.logger = new common_1.Logger(AuctionProcessor_1.name);
    }
    async process(job) {
        const { auctionId, title } = job.data;
        this.logger.log(`[JOB ${job.id}] Processing finalization for auction: ${title} (${auctionId})`);
        try {
            const auction = await this.auctionRepository.findAuctionById(auctionId);
            if (auction.status === 'WINNER_DETERMINED') {
                this.logger.log(`[JOB ${job.id}] Auction ${auctionId} already has a winner, skipping`);
                return { success: true, auctionId, skipped: true, message: 'Winner already determined' };
            }
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
            await this.auctionRepository.updateAuction(auctionId, {
                status: 'WINNER_DETERMINED',
                winnerId: winningBid.bidderId,
                winningBidAmount: winningBid.bidAmount,
            });
            this.logger.log(`[JOB ${job.id}] Auction ${auctionId} finalized. ` +
                `Winner: ${winningBid.bidderName} with bid $${winningBid.bidAmount}`);
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
        }
        catch (error) {
            this.logger.error(`[JOB ${job.id}] Failed to finalize auction ${auctionId}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.AuctionProcessor = AuctionProcessor;
exports.AuctionProcessor = AuctionProcessor = AuctionProcessor_1 = __decorate([
    (0, bullmq_1.Processor)(constants_1.QUEUE_NAMES.AUCTION_FINALIZATION),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bid_repository_1.BidRepository,
        auction_repository_1.AuctionRepository])
], AuctionProcessor);
//# sourceMappingURL=auction.processor.js.map