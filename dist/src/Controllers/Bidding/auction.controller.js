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
var AuctionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionController = void 0;
const common_1 = require("@nestjs/common");
const auction_service_1 = require("../../Domains/Bidding/auction.service");
const dto_1 = require("./dto");
let AuctionController = AuctionController_1 = class AuctionController {
    constructor(auctionService) {
        this.auctionService = auctionService;
        this.logger = new common_1.Logger(AuctionController_1.name);
    }
    async getActiveAuctions() {
        return await this.auctionService.getActiveAuctions();
    }
    async getAuctionById(params) {
        return await this.auctionService.getAuctionById(params.id);
    }
    async getAuctionStats(params) {
        return await this.auctionService.getAuctionStats(params.id);
    }
    async getAuctionLeaderboard(params) {
        return await this.auctionService.getAuctionLeaderboard(params.id);
    }
    async createAuction(createAuctionDto) {
        this.logger.log(`Creating auction: ${createAuctionDto.title}`);
        return await this.auctionService.createAuction(createAuctionDto);
    }
    async finalizeAuction(params) {
        this.logger.log(`Finalizing auction: ${params.id}`);
        return await this.auctionService.finalizeAuction(params.id);
    }
    async updateAuction(params, updateAuctionDto) {
        return await this.auctionService.updateAuction(params.id, updateAuctionDto);
    }
    async deleteAuction(params) {
        return await this.auctionService.deleteAuction(params.id);
    }
};
exports.AuctionController = AuctionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "getActiveAuctions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuctionParamDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "getAuctionById", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuctionParamDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "getAuctionStats", null);
__decorate([
    (0, common_1.Get)(':id/leaderboard'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuctionParamDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "getAuctionLeaderboard", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAuctionDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "createAuction", null);
__decorate([
    (0, common_1.Post)(':id/finalize'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuctionParamDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "finalizeAuction", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuctionParamDto,
        dto_1.UpdateAuctionDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "updateAuction", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuctionParamDto]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "deleteAuction", null);
exports.AuctionController = AuctionController = AuctionController_1 = __decorate([
    (0, common_1.Controller)('auctions'),
    __metadata("design:paramtypes", [auction_service_1.AuctionService])
], AuctionController);
//# sourceMappingURL=auction.controller.js.map