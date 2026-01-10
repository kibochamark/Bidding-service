import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateProductDto, SearchProductsDto, UpdateProductDto } from '../../../src/Controllers/Products/dto';
import { Prisma } from '../../../generated/prisma/client';

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasMore: boolean;
        cursor?: string;
    };
}

@Injectable()
export class ProductRepository {
    private readonly logger = new Logger(ProductRepository.name);

    constructor(private prisma: PrismaService) {}

    /**
     * Create a new product listing
     */
    async createProduct(data: CreateProductDto) {
        this.logger.log(`Creating product: ${data.title}`);

        let query_data ={
            ...data,
            endDate:new Date(data.endDate),
            currentBid:data.startingPrice
        }


        if (data.images){
            query_data["images"]=data.images
        }



        return await this.prisma.product.create({
            data: {
                ...query_data,
                specifications: data.specifications as Prisma.InputJsonValue,
            },
            include: {
                category: true,
            },
        });
    }

    /**
     * Find product by ID
     */
    async findProductById(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }

    /**
     * Update product
     */
    async updateProduct(id: string, data: Partial<UpdateProductDto>) {
        await this.findProductById(id);

        this.logger.log(`Updating product: ${id}`);

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

    /**
     * Delete product
     */
    async deleteProduct(id: string) {
        await this.findProductById(id);

        this.logger.log(`Deleting product: ${id}`);

        return await this.prisma.product.delete({
            where: { id },
        });
    }

    /**
     * Search products with full-text search and filters
     * Supports both offset and cursor pagination
     */
    async searchProducts(
        filters: SearchProductsDto,
    ): Promise<PaginatedResponse<any>> {
        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const skip = (page - 1) * limit;

        this.logger.log(`Searching products with filters: ${JSON.stringify(filters)}`);

        // Build where clause
        const where: Prisma.ProductWhereInput = {
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
            where.currentBid = {};
            if (filters.minPrice !== undefined) {
                where.currentBid.gte = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                where.currentBid.lte = filters.maxPrice;
            }
        }

        // Build orderBy clause
        let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };

        switch (filters.sortBy) {
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            case 'ending_soon':
                orderBy = { endDate: 'asc' };
                break;
            case 'highest_bid':
                orderBy = { currentBid: 'desc' };
                break;
            case 'lowest_price':
                orderBy = { currentBid: 'asc' };
                break;
        }

        // If full-text search query exists, use PostgreSQL tsvector
        if (filters.query) {
            return this.fullTextSearch(filters.query, where, orderBy, page, limit);
        }

        // Regular search without full-text
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    category: true,
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

    /**
     * Full-text search using PostgreSQL tsvector
     */
    private async fullTextSearch(
        query: string,
        where: Prisma.ProductWhereInput,
        orderBy: Prisma.ProductOrderByWithRelationInput,
        page: number,
        limit: number,
    ): Promise<PaginatedResponse<any>> {
        const skip = (page - 1) * limit;

        // Convert query to tsquery format (handle special characters)
        const sanitizedQuery = query
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0)
            .join(' & ');

        this.logger.log(`Full-text search query: ${sanitizedQuery}`);

        // Build WHERE conditions for raw query
        const conditions: string[] = ["search_vector @@ to_tsquery('english', $1)"];
        const params: any[] = [sanitizedQuery];
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

        if (where.currentBid) {
            if ((where.currentBid as any).gte !== undefined) {
                conditions.push(`"currentBid" >= $${paramIndex}`);
                params.push((where.currentBid as any).gte);
                paramIndex++;
            }
            if ((where.currentBid as any).lte !== undefined) {
                conditions.push(`"currentBid" <= $${paramIndex}`);
                params.push((where.currentBid as any).lte);
                paramIndex++;
            }
        }

        const whereClause = conditions.join(' AND ');

        // Determine ORDER BY
        let orderByClause = 'rank DESC, "createdAt" DESC';
        if (orderBy.endDate) {
            orderByClause = `rank DESC, "endDate" ${orderBy.endDate === 'asc' ? 'ASC' : 'DESC'}`;
        } else if (orderBy.currentBid) {
            orderByClause = `rank DESC, "currentBid" ${orderBy.currentBid === 'asc' ? 'ASC' : 'DESC'}`;
        }

        // Execute full-text search with relevance ranking
        const products = await this.prisma.$queryRawUnsafe<any[]>(`
            SELECT
                p.*,
                ts_rank(p.search_vector, to_tsquery('english', $1)) as rank
            FROM "Product" p
            WHERE ${whereClause}
            ORDER BY ${orderByClause}
            LIMIT $${paramIndex}
            OFFSET $${paramIndex + 1}
        `, ...params, limit, skip);

        // Get total count for pagination
        const countResult = await this.prisma.$queryRawUnsafe<[{ count: bigint }]>(`
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

    /**
     * Get products by category (optimized with index)
     */
    async findProductsByCategory(
        categoryId: string,
        page = 1,
        limit = '20',
    ): Promise<PaginatedResponse<any>> {
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
                limit:parseInt(limit),
                totalPages,
                hasMore: page < totalPages,
            },
        };
    }

    /**
     * Get seller's products
     */
    async findProductsBySeller(
        sellerId: string,
        page = 1,
        limit = 20,
    ): Promise<PaginatedResponse<any>> {
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

    /**
     * Get ending soon products (for homepage)
     */
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
            },
        });
    }

    /**
     * Get newest products
     */
    async findNewest(limit = '20') {
        return await this.prisma.product.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            // take: parseInt(limit, 10),
            include: {
                category: true,
            },
        });
    }


    async findAllProducts(page = '1', limit = '20'): Promise<PaginatedResponse<any>> {
        // Ensure page is at least 1 (pagination starts at 1, not 0)
        const pageNumber = Math.max(1, parseInt(page) || 1);
        const limitNumber = limit === 'All' ? 'All' : parseInt(limit) || 20;

        let skip = 0

        if(limitNumber !== 'All'){
            skip = (pageNumber - 1) * limitNumber;
        }

        this.logger.log(`findAllProducts called with page=${page} (normalized to ${pageNumber}), limit=${limit}, calculated skip=${skip}`);

        const query: any = {
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip:Math.abs(skip),
            include: {
                category: true,
            },
        };

        if (limitNumber !== 'All') {
            query.take = limitNumber;
        }

        this.logger.log(`Query object: ${JSON.stringify(query, null, 2)}`);
    

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({...query}),
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
}
