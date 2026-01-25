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
var ProductRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
const auction_service_1 = require("../Bidding/auction.service");
let ProductRepository = ProductRepository_1 = class ProductRepository {
    constructor(prisma, auctionService) {
        this.prisma = prisma;
        this.auctionService = auctionService;
        this.logger = new common_1.Logger(ProductRepository_1.name);
    }
    async createProduct(data) {
        this.logger.log(`Creating product: ${data.title}`);
        let query_data = {
            ...data,
            endDate: new Date(data.endDate),
        };
        if (data.images) {
            query_data["images"] = data.images;
        }
        return await this.prisma.product.create({
            data: {
                ...query_data,
                specifications: data.specifications,
            },
            include: {
                category: true
            },
        });
    }
    async findProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                auctions: {
                    orderBy: {
                        status: "asc"
                    }
                }
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async updateProduct(id, data) {
        const located_product = await this.findProductById(id);
        this.logger.log(`Updating product: ${id}`);
        if (located_product.id) {
            if (data.endDate) {
                return await this.prisma.$transaction(async (tx) => {
                    const updatedproduct = await tx.product.update({
                        where: {
                            id
                        },
                        data: {
                            ...data
                        },
                        select: {
                            auctions: {
                                where: {
                                    status: "ACTIVE"
                                },
                                take: 1
                            }
                        }
                    });
                    await tx.auction.update({
                        where: {
                            id: updatedproduct.auctions[0].id
                        },
                        data: {
                            endDate: new Date(data.endDate)
                        }
                    });
                    return updatedproduct;
                });
            }
            else {
                return await this.prisma.product.update({
                    where: { id },
                    data: {
                        ...data
                    },
                    include: {
                        category: true,
                    },
                });
            }
        }
        else {
            throw new common_1.BadRequestException(`product with id: ${id} not found`);
        }
    }
    async deleteProduct(id) {
        await this.findProductById(id);
        this.logger.log(`Deleting product: ${id}`);
        return await this.prisma.product.delete({
            where: { id },
        });
    }
    async searchProducts(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const skip = (page - 1) * limit;
        this.logger.log(`Searching products with filters: ${JSON.stringify(filters)}`);
        const where = {
            isActive: filters.isActive !== undefined ? filters.isActive : true,
        };
        if (filters.categoryId) {
            where.categoryId = filters.categoryId;
        }
        if (filters.condition) {
            where.condition = filters.condition;
        }
        if (filters.sellerId) {
            where.sellerId = filters.sellerId;
        }
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.retailValue = {};
            if (filters.minPrice !== undefined) {
                where.retailValue.gte = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                where.retailValue.lte = filters.maxPrice;
            }
        }
        let orderBy = { createdAt: 'desc' };
        switch (filters.sortBy) {
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            case 'ending_soon':
                orderBy = { endDate: 'asc' };
                break;
            case 'highest_bid':
                orderBy = { retailValue: 'desc' };
                break;
            case 'lowest_price':
                orderBy = { retailValue: 'asc' };
                break;
        }
        if (filters.query) {
            return this.fullTextSearch(filters.query, where, orderBy, page, limit);
        }
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    category: true,
                    auctions: {
                        orderBy: {
                            status: "asc"
                        }
                    }
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: products,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasMore: page < totalPages,
            },
        };
    }
    async fullTextSearch(query, where, orderBy, page, limit) {
        const skip = (page - 1) * limit;
        const sanitizedQuery = query
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0)
            .join(' & ');
        this.logger.log(`Full-text search query: ${sanitizedQuery}`);
        const conditions = ["search_vector @@ to_tsquery('english', $1)"];
        const params = [sanitizedQuery];
        let paramIndex = 2;
        if (where.isActive !== undefined) {
            conditions.push(`"isActive" = $${paramIndex}`);
            params.push(where.isActive);
            paramIndex++;
        }
        if (where.categoryId) {
            conditions.push(`"categoryId" = $${paramIndex}`);
            params.push(where.categoryId);
            paramIndex++;
        }
        if (where.condition) {
            conditions.push(`condition = $${paramIndex}`);
            params.push(where.condition);
            paramIndex++;
        }
        if (where.sellerId) {
            conditions.push(`"sellerId" = $${paramIndex}`);
            params.push(where.sellerId);
            paramIndex++;
        }
        if (where.retailValue) {
            if (where.retailValue.gte !== undefined) {
                conditions.push(`"retailValue" >= $${paramIndex}`);
                params.push(where.retailValue.gte);
                paramIndex++;
            }
            if (where.retailValue.lte !== undefined) {
                conditions.push(`"retailValue" <= $${paramIndex}`);
                params.push(where.retailValue.lte);
                paramIndex++;
            }
        }
        const whereClause = conditions.join(' AND ');
        let orderByClause = 'rank DESC, "createdAt" DESC';
        if (orderBy.endDate) {
            orderByClause = `rank DESC, "endDate" ${orderBy.endDate === 'asc' ? 'ASC' : 'DESC'}`;
        }
        else if (orderBy.retailValue) {
            orderByClause = `rank DESC, "retailValue" ${orderBy.retailValue === 'asc' ? 'ASC' : 'DESC'}`;
        }
        const products = await this.prisma.$queryRawUnsafe(`
            SELECT
                p.*,
                ts_rank(p.search_vector, to_tsquery('english', $1)) as rank
            FROM "Product" p
            WHERE ${whereClause}
            ORDER BY ${orderByClause}
            LIMIT $${paramIndex}
            OFFSET $${paramIndex + 1}
        `, ...params, limit, skip);
        const countResult = await this.prisma.$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM "Product"
            WHERE ${whereClause}
        `, ...params.slice(0, paramIndex - 1));
        const total = Number(countResult[0].count);
        const totalPages = Math.ceil(total / limit);
        return {
            data: products,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasMore: page < totalPages,
            },
        };
    }
    async findProductsByCategory(categoryId, page = 1, limit = '20') {
        const skip = (page - 1) * parseInt(limit);
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where: {
                    categoryId,
                    isActive: true,
                },
                orderBy: {
                    endDate: 'asc',
                },
                skip,
                take: parseInt(limit),
                include: {
                    category: true,
                    auctions: {
                        orderBy: {
                            status: "asc",
                            createdAt: "desc"
                        }
                    }
                },
            }),
            this.prisma.product.count({
                where: {
                    categoryId,
                    isActive: true,
                },
            }),
        ]);
        const totalPages = Math.ceil(total / parseInt(limit));
        return {
            data: products,
            pagination: {
                total,
                page,
                limit: parseInt(limit),
                totalPages,
                hasMore: page < totalPages,
            },
        };
    }
    async findProductsBySeller(sellerId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where: {
                    sellerId,
                    isActive: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
                include: {
                    category: true,
                    auctions: {
                        orderBy: {
                            status: "asc",
                            createdAt: "desc"
                        }
                    }
                },
            }),
            this.prisma.product.count({
                where: {
                    sellerId,
                    isActive: true,
                },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: products,
            pagination: {
                total,
                page,
                limit,
                totalPages,
                hasMore: page < totalPages,
            },
        };
    }
    async findEndingSoon(limit = '10') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return await this.prisma.product.findMany({
            where: {
                isActive: true,
                endDate: {
                    lte: tomorrow,
                    gte: new Date(),
                },
            },
            orderBy: {
                endDate: 'asc',
            },
            take: parseInt(limit),
            include: {
                category: true,
                auctions: {
                    orderBy: {
                        status: "asc"
                    }
                }
            },
        });
    }
    async findNewest(limit = '20') {
        return await this.prisma.product.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
                auctions: {
                    orderBy: {
                        status: "asc"
                    }
                }
            },
        });
    }
    async findAllProducts(page = '1', limit = '20') {
        const pageNumber = Math.max(1, parseInt(page) || 1);
        const limitNumber = limit === 'All' ? 'All' : parseInt(limit) || 20;
        let skip = 0;
        if (limitNumber !== 'All') {
            skip = (pageNumber - 1) * limitNumber;
        }
        this.logger.log(`findAllProducts called with page=${page} (normalized to ${pageNumber}), limit=${limit}, calculated skip=${skip}`);
        const query = {
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: Math.abs(skip),
            include: {
                category: true,
                auctions: {
                    orderBy: {
                        status: "asc",
                    }
                }
            },
        };
        if (limitNumber !== 'All') {
            query.take = limitNumber;
        }
        this.logger.log(`Query object: ${JSON.stringify(query, null, 2)}`);
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({ ...query }),
            this.prisma.product.count({
                where: {
                    isActive: true,
                },
            }),
        ]);
        const totalPages = limitNumber === 'All' ? 1 : Math.ceil(total / limitNumber);
        return {
            data: products,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber === 'All' ? total : limitNumber,
                totalPages,
                hasMore: pageNumber < totalPages,
            },
        };
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = ProductRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auction_service_1.AuctionService])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map