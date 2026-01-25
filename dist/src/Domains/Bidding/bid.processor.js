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
var BidProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../queue/constants");
const bid_repository_1 = require("./bid.repository");
let BidProcessor = BidProcessor_1 = class BidProcessor extends bullmq_1.WorkerHost {
    constructor(bidRepository) {
        super();
        this.bidRepository = bidRepository;
        this.logger = new common_1.Logger(BidProcessor_1.name);
    }
    async process(job) {
        this.logger.log(`Processing bid job ${job.id} for auction ${job.data.auctionId}`);
        try {
            const bidData = job.data;
            const result = await this.bidRepository.placeBidWithPayment(bidData);
            this.logger.log(`Bid processed successfully: ${result.id}`);
            if (result.processedAfterAuctionEnd && result.withinGracePeriod) {
                this.logger.warn(`Bid ${result.id} was placed after auction end but within grace period. ` +
                    `Auction: ${bidData.auctionId}, Bidder: ${bidData.bidderName}`);
            }
            return {
                success: true,
                bidId: result.id,
                isUnique: result.isUnique,
                isWinning: result.isWinning,
                processedAfterAuctionEnd: result.processedAfterAuctionEnd,
                withinGracePeriod: result.withinGracePeriod,
            };
        }
        catch (error) {
            this.logger.error(`Failed to process bid job ${job.id}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.BidProcessor = BidProcessor;
exports.BidProcessor = BidProcessor = BidProcessor_1 = __decorate([
    (0, bullmq_1.Processor)(constants_1.JOB_NAMES.PROCESS_BID),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bid_repository_1.BidRepository])
], BidProcessor);
//# sourceMappingURL=bid.processor.js.map