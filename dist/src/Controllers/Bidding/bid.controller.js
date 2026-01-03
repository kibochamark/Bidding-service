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
var BidController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidController = void 0;
const common_1 = require("@nestjs/common");
const bid_service_1 = require("../../Domains/Bidding/bid.service");
const dto_1 = require("./dto");
let BidController = BidController_1 = class BidController {
    constructor(bidService) {
        this.bidService = bidService;
        this.logger = new common_1.Logger(BidController_1.name);
    }
    async placeBid(placeBidDto) {
        this.logger.log(`Placing bid for auction ${placeBidDto.auctionId} by ${placeBidDto.bidderName}`);
        return await this.bidService.placeBid(placeBidDto);
    }
    async getBidsByAuctionId(auctionId) {
        return await this.bidService.getBidsByAuctionId(auctionId);
    }
    async getBidsByBidderId(bidderId) {
        return await this.bidService.getBidsByBidderId(bidderId);
    }
    async getBidById(params) {
        return await this.bidService.getBidById(params.id);
    }
    async getCurrentWinningBid(auctionId) {
        return await this.bidService.getCurrentWinningBid(auctionId);
    }
    async getBidStatistics(auctionId) {
        return await this.bidService.getBidStatistics(auctionId);
    }
};
exports.BidController = BidController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PlaceBidDto]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "placeBid", null);
__decorate([
    (0, common_1.Get)('auction/:auctionId'),
    __param(0, (0, common_1.Param)('auctionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidsByAuctionId", null);
__decorate([
    (0, common_1.Get)('bidder/:bidderId'),
    __param(0, (0, common_1.Param)('bidderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidsByBidderId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BidParamDto]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidById", null);
__decorate([
    (0, common_1.Get)('auction/:auctionId/winning'),
    __param(0, (0, common_1.Param)('auctionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getCurrentWinningBid", null);
__decorate([
    (0, common_1.Get)('auction/:auctionId/statistics'),
    __param(0, (0, common_1.Param)('auctionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidStatistics", null);
exports.BidController = BidController = BidController_1 = __decorate([
    (0, common_1.Controller)('bids'),
    __metadata("design:paramtypes", [bid_service_1.BidService])
], BidController);
//# sourceMappingURL=bid.controller.js.map