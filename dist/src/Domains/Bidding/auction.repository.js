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
var AuctionRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuctionRepository = AuctionRepository_1 = class AuctionRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuctionRepository_1.name);
    }
    async findActiveAuctions() {
        this.logger.log('Fetching all active auctions');
        return await this.prisma.auction.findMany({
            where: {
                status: 'ACTIVE',
                endDate: { gte: new Date() }
            },
            include: {
                product: true,
                _count: {
                    select: { bids: true }
                }
            },
            orderBy: { endDate: 'asc' },
        });
    }
    async findAuctionById(id) {
        this.logger.log(`Fetching auction with ID: ${id}`);
        const auction = await this.prisma.auction.findUnique({
            where: { id },
            include: {
                product: true,
                bids: {
                    orderBy: { bidAmount: 'asc' }
                }
            },
        });
        if (!auction) {
            this.logger.warn(`Auction with ID: ${id} not found`);
            throw new common_1.NotFoundException(`Auction with ID ${id} not found`);
        }
        return auction;
    }
    async createAuction(data) {
        this.logger.log(`Creating auction for product ID: ${data.productId}`);
        const product = await this.prisma.product.findUnique({
            where: { id: data.productId },
        });
        if (!product) {
            this.logger.warn(`Product with ID: ${data.productId} not found`);
            throw new common_1.NotFoundException(`Product with ID ${data.productId} not found`);
        }
        const endDate = new Date(data.endDate);
        if (endDate <= new Date()) {
            throw new common_1.BadRequestException('End date must be in the future');
        }
        return await this.prisma.auction.create({
            data: {
                productId: data.productId,
                title: data.title,
                description: data.description,
                prizeValue: data.prizeValue,
                entryFee: data.entryFee,
                endDate: endDate,
                status: 'ACTIVE',
            },
            include: {
                product: true,
            }
        });
    }
    async updateAuction(id, data) {
        this.logger.log(`Updating auction with ID: ${id}`);
        const existingAuction = await this.findAuctionById(id);
        if (!existingAuction) {
            this.logger.warn(`Auction with ID: ${id} not found`);
            throw new common_1.NotFoundException(`Auction with ID ${id} not found`);
        }
        if (data.endDate) {
            const endDate = new Date(data.endDate);
            if (endDate <= new Date()) {
                throw new common_1.BadRequestException('End date must be in the future');
            }
        }
        return await this.prisma.auction.update({
            where: { id },
            data: {
                ...data,
                ...(data.endDate && { endDate: new Date(data.endDate) })
            },
            include: {
                product: true,
            }
        });
    }
    async deleteAuction(id) {
        const existingAuction = await this.findAuctionById(id);
        if (!existingAuction) {
            this.logger.warn(`Auction with ID: ${id} not found`);
            throw new common_1.NotFoundException(`Auction with ID ${id} not found`);
        }
        this.logger.log(`Deleting auction with ID: ${id}`);
        return await this.prisma.auction.delete({
            where: { id },
        });
    }
    async getAuctionStats(id) {
        const auction = await this.findAuctionById(id);
        const stats = await this.prisma.bid.groupBy({
            by: ['auctionId'],
            where: { auctionId: id },
            _count: {
                id: true,
            },
            _min: {
                bidAmount: true,
            },
            _max: {
                bidAmount: true,
            }
        });
        const uniqueBidsCount = await this.prisma.bid.count({
            where: {
                auctionId: id,
                isUnique: true,
            }
        });
        return {
            auction,
            totalBids: stats[0]?._count.id || 0,
            uniqueBids: uniqueBidsCount,
            lowestBid: stats[0]?._min.bidAmount,
            highestBid: stats[0]?._max.bidAmount,
        };
    }
};
exports.AuctionRepository = AuctionRepository;
exports.AuctionRepository = AuctionRepository = AuctionRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuctionRepository);
//# sourceMappingURL=auction.repository.js.map