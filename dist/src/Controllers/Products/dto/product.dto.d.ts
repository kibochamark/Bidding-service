import { ProductCondition } from 'generated/prisma/enums';
export declare class CreateProductDto {
    title: string;
    description: string;
    categoryId: string;
    condition: ProductCondition;
    images?: string[];
    retailValue: number;
    entryFee: number;
    endDate: string;
    sellerId: string;
    sellerName: string;
    specifications: Record<string, any>;
}
export declare class UpdateProductDto {
    title?: string;
    description?: string;
    condition?: ProductCondition;
    images?: string[];
    retailValue?: number;
    entryFee?: number;
    endDate?: string;
    specifications?: Record<string, any>;
    isActive?: boolean;
}
export declare class SearchProductsDto {
    query?: string;
    categoryId?: string;
    condition?: ProductCondition;
    minPrice?: number;
    maxPrice?: number;
    sellerId?: string;
    isActive?: boolean;
    sortBy?: 'newest' | 'ending_soon' | 'highest_bid' | 'lowest_price';
    page?: number;
    limit?: number;
    cursor?: string;
}
export declare class ProductParamDto {
    id: string;
}
export declare class CategorySlugDto {
    slug: string;
}
