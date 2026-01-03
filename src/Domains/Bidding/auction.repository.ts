import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAuctionDto, UpdateAuctionDto } from '../../Controllers/Bidding/dto';

@Injectable()
export class AuctionRepository {
    private readonly logger = new Logger(AuctionRepository.name);
    constructor(private prisma: PrismaService) {}

    /**
     * Find all active auctions
     */
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

    /**
     * Find auction by ID
     */
    async findAuctionById(id: string) {
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
            throw new NotFoundException(`Auction with ID ${id} not found`);
        }

        return auction;
    }

    /**
     * Create a new auction
     */
    async createAuction(data: CreateAuctionDto) {
        this.logger.log(`Creating auction for product ID: ${data.productId}`);

        // Verify product exists
        const product = await this.prisma.product.findUnique({
            where: { id: data.productId },
        });

        if (!product) {
            this.logger.warn(`Product with ID: ${data.productId} not found`);
            throw new NotFoundException(`Product with ID ${data.productId} not found`);
        }

        // Validate end date is in the future
        const endDate = new Date(data.endDate);
        if (endDate <= new Date()) {
            throw new BadRequestException('End date must be in the future');
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

    /**
     * Update an existing auction
     */
    async updateAuction(id: string, data: UpdateAuctionDto) {
        this.logger.log(`Updating auction with ID: ${id}`);

        const existingAuction = await this.findAuctionById(id);

        if (!existingAuction) {
            this.logger.warn(`Auction with ID: ${id} not found`);
            throw new NotFoundException(`Auction with ID ${id} not found`);
        }

        // If updating end date, validate it's in the future
        if (data.endDate) {
            const endDate = new Date(data.endDate);
            if (endDate <= new Date()) {
                throw new BadRequestException('End date must be in the future');
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

    /**
     * Delete an auction
     */
    async deleteAuction(id: string) {
        const existingAuction = await this.findAuctionById(id);

        if (!existingAuction) {
            this.logger.warn(`Auction with ID: ${id} not found`);
            throw new NotFoundException(`Auction with ID ${id} not found`);
        }

        this.logger.log(`Deleting auction with ID: ${id}`);

        return await this.prisma.auction.delete({
            where: { id },
        });
    }

    /**
     * Get auction statistics
     */
    async getAuctionStats(id: string) {
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
}
