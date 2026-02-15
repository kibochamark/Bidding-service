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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var BidController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidController = void 0;
const common_1 = require("@nestjs/common");
const bid_service_1 = require("../../Domains/Bidding/bid.service");
const dto_1 = require("./dto");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const constants_1 = require("../../queue/constants");
const stripe_provider_1 = require("../../providers/stripe.provider");
const kinde_auth_guard_1 = require("../../Guards/kinde-auth.guard");
const current_user_decorator_1 = require("../../Guards/current-user.decorator");
let BidController = BidController_1 = class BidController {
    constructor(bidService, configService, bidQueue, stripe) {
        this.bidService = bidService;
        this.configService = configService;
        this.bidQueue = bidQueue;
        this.stripe = stripe;
        this.logger = new common_1.Logger(BidController_1.name);
    }
    async getBidsByAuctionId(auctionId) {
        return await this.bidService.getBidsByAuctionId(auctionId);
    }
    async getBidsByBidderId(bidderId, user) {
        return await this.bidService.getBidsByBidderId(bidderId);
    }
    async getBidByKindeId(params) {
        return await this.bidService.getBidsByBidderId(params.kinde_id);
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
    async getStripePaymentEvent(req, res) {
        const endpoint_secret = this.configService.get("ENDPOINT_SECRET");
        let event;
        if (endpoint_secret) {
            this.logger.log("stripe secret present,....decoding event");
            const signature = req.headers['stripe-signature'];
            console.log(signature, "sig");
            try {
                event = this.stripe.webhooks.constructEvent(req.rawBody, signature.toString(), endpoint_secret);
                this.logger.log("event received...proceeding to queue job");
                this.logger.log(`event: ${JSON.stringify(event)}`);
                const job = await this.bidQueue.add(constants_1.JOB_NAMES.PROCESS_BID, {
                    paymentIntentId: event.data.object.id,
                    ...event.data.object.metadata
                }, {
                    jobId: event.id,
                });
                this.logger.log(`Added bid processing job: ${job.id} for auction: ${event.id}`);
            }
            catch (err) {
                console.log(`⚠️ Webhook signature verification failed.`, err.message);
                return res.status(400).json({
                    status: "failed",
                    message: err.message
                });
            }
        }
        else {
            return res.status(403).json({
                status: "forbidden",
                message: new common_1.ForbiddenException("stripe secret key not provided")
            });
        }
    }
};
exports.BidController = BidController;
__decorate([
    (0, common_1.Get)('auction/:auctionId'),
    __param(0, (0, common_1.Param)('auctionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidsByAuctionId", null);
__decorate([
    (0, common_1.Get)('bidder/:bidderId'),
    (0, common_1.UseGuards)(kinde_auth_guard_1.KindeAuthGuard),
    __param(0, (0, common_1.Param)('bidderId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidsByBidderId", null);
__decorate([
    (0, common_1.Get)('my-bids/:kinde_id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BidUserParamDto]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getBidByKindeId", null);
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
__decorate([
    (0, common_1.Post)('stripe/webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "getStripePaymentEvent", null);
exports.BidController = BidController = BidController_1 = __decorate([
    (0, common_1.Controller)('bids'),
    __param(2, (0, bullmq_1.InjectQueue)(constants_1.JOB_NAMES.PROCESS_BID)),
    __param(3, (0, common_1.Inject)(stripe_provider_1.STRIPE_CLIENT)),
    __metadata("design:paramtypes", [bid_service_1.BidService,
        config_1.ConfigService,
        bullmq_2.Queue,
        stripe_1.default])
], BidController);
//# sourceMappingURL=bid.controller.js.map