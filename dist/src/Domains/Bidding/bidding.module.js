"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddingModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const auction_controller_1 = require("../../Controllers/Bidding/auction.controller");
const bid_controller_1 = require("../../Controllers/Bidding/bid.controller");
const auction_service_1 = require("./auction.service");
const bid_service_1 = require("./bid.service");
const auction_repository_1 = require("./auction.repository");
const bid_repository_1 = require("./bid.repository");
const bid_processor_1 = require("./bid.processor");
const queue_module_1 = require("../../queue/queue.module");
const stripe_provider_1 = require("../../providers/stripe.provider");
let BiddingModule = class BiddingModule {
};
exports.BiddingModule = BiddingModule;
exports.BiddingModule = BiddingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            queue_module_1.QueueModule,
        ],
        controllers: [auction_controller_1.AuctionController, bid_controller_1.BidController],
        providers: [
            prisma_service_1.PrismaService,
            auction_service_1.AuctionService,
            bid_service_1.BidService,
            auction_repository_1.AuctionRepository,
            bid_repository_1.BidRepository,
            bid_processor_1.BidProcessor,
            stripe_provider_1.StripeProvider,
        ],
        exports: [auction_service_1.AuctionService, bid_service_1.BidService, auction_repository_1.AuctionRepository, bid_repository_1.BidRepository],
    })
], BiddingModule);
//# sourceMappingURL=bidding.module.js.map