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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuctionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionService = void 0;
const common_1 = require("@nestjs/common");
const auction_repository_1 = require("./auction.repository");
const bid_repository_1 = require("./bid.repository");
const schedule_1 = require("@nestjs/schedule");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
const constants_1 = require("../../queue/constants");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuctionService = AuctionService_1 = class AuctionService {
    constructor(auctionRepository, bidRepository, prisma, auctionQueue) {
        this.auctionRepository = auctionRepository;
        this.bidRepository = bidRepository;
        this.prisma = prisma;
        this.auctionQueue = auctionQueue;
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
    async endAuctions() {
        const now = new Date();
        this.logger.debug(`[CRON] Checking for ended auctions at ${now.toISOString()}`);
        try {
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
            await this.prisma.auction.updateMany({
                where: {
                    id: { in: auctionIds }
                },
                data: {
                    status: 'ENDED'
                }
            });
            this.logger.log(`[CRON] Updated ${auctionIds.length} auction(s) to ENDED status`);
            for (const auction of endedAuctions) {
                const job = await this.auctionQueue.add(constants_1.JOB_NAMES.FINALIZE_AUCTION, {
                    auctionId: auction.id,
                    title: auction.title,
                    endDate: auction.endDate.toISOString(),
                }, {
                    jobId: `finalize-${auction.id}`,
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 1000,
                    },
                });
                this.logger.log(`[CRON] Queued finalization job ${job.id} for auction: ${auction.title} (ID: ${auction.id})`);
            }
        }
        catch (error) {
            this.logger.error(`[CRON] Error checking for ended auctions: ${error.message}`);
        }
    }
    async finalizeStaleAuctions() {
        const now = new Date();
        const staleThreshold = new Date(now.getTime() - 2 * 60 * 1000);
        this.logger.debug(`[CRON:STALE] Checking for unfinalised auctions at ${now.toISOString()}`);
        try {
            const staleAuctions = await this.prisma.auction.findMany({
                where: {
                    status: 'ENDED',
                    endDate: {
                        lte: staleThreshold,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    endDate: true,
                },
            });
            if (staleAuctions.length === 0) {
                this.logger.debug('[CRON:STALE] No stale auctions found');
                return;
            }
            this.logger.warn(`[CRON:STALE] Found ${staleAuctions.length} auction(s) stuck in ENDED without winner calculation`);
            for (const auction of staleAuctions) {
                const job = await this.auctionQueue.add(constants_1.JOB_NAMES.FINALIZE_AUCTION, {
                    auctionId: auction.id,
                    title: auction.title,
                    endDate: auction.endDate.toISOString(),
                }, {
                    jobId: `finalize-stale-${auction.id}-${Date.now()}`,
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 2000,
                    },
                });
                this.logger.log(`[CRON:STALE] Re-queued finalization job ${job.id} for auction: ${auction.title} (ID: ${auction.id})`);
            }
        }
        catch (error) {
            this.logger.error(`[CRON:STALE] Error processing stale auctions: ${error.message}`);
        }
    }
};
exports.AuctionService = AuctionService;
__decorate([
    (0, schedule_1.Cron)('0 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuctionService.prototype, "endAuctions", null);
__decorate([
    (0, schedule_1.Cron)('0 */5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuctionService.prototype, "finalizeStaleAuctions", null);
exports.AuctionService = AuctionService = AuctionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, bullmq_2.InjectQueue)(constants_1.QUEUE_NAMES.AUCTION_FINALIZATION)),
    __metadata("design:paramtypes", [auction_repository_1.AuctionRepository,
        bid_repository_1.BidRepository,
        prisma_service_1.PrismaService,
        bullmq_1.Queue])
], AuctionService);
//# sourceMappingURL=auction.service.js.map