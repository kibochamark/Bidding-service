import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsDecimal,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';
import { ProductCondition } from 'generated/prisma/enums';
import { Type } from 'class-transformer';

/**
 * DTO for creating a new product listing
 */
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsEnum(ProductCondition)
    condition: ProductCondition;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    startingPrice: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    reservePrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    buyNowPrice?: number;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @IsNotEmpty()
    @IsString()
    sellerId: string; // Will be extracted from @CurrentUser in production

    @IsNotEmpty()
    @IsString()
    sellerName: string; // Will be extracted from @CurrentUser in production

    @IsNotEmpty()
    @IsObject()
    specifications: Record<string, any>;
}

/**
 * DTO for updating a product
 */
export class UpdateProductDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(ProductCondition)
    condition?: ProductCondition;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsNumber()
    @Min(0)
    reservePrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    buyNowPrice?: number;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsObject()
    specifications?: Record<string, any>;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

/**
 * DTO for product search and filtering
 */
export class SearchProductsDto {
    @IsOptional()
    @IsString()
    query?: string; // Full-text search query

    @IsOptional()
    @IsString()
    categoryId?: string;

    @IsOptional()
    @IsEnum(ProductCondition)
    condition?: ProductCondition;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxPrice?: number;

    @IsOptional()
    @IsString()
    sellerId?: string;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isActive?: boolean;

    @IsOptional()
    @IsEnum(['newest', 'ending_soon', 'highest_bid', 'lowest_price'])
    sortBy?: 'newest' | 'ending_soon' | 'highest_bid' | 'lowest_price';

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    page?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    cursor?: string; // For cursor-based pagination
}

/**
 * DTO for product ID path parameter
 */
export class ProductParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}

/**
 * DTO for category slug parameter
 */
export class CategorySlugDto {
    @IsNotEmpty()
    @IsString()
    slug: string;
}
