import { Injectable, Logger } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto, SearchProductsDto, UpdateProductDto } from '../../../src/Controllers/Products/dto';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(private productRepository: ProductRepository) {}

    async createProduct(data: CreateProductDto) {
        this.logger.log(`Creating product: ${data.title} by seller: ${data.sellerId}`);
        const product = await this.productRepository.createProduct(data);
        this.logger.log(`Product created successfully with ID: ${product.id}`);
        return product;
    }

    async getProductById(id: string) {
        this.logger.log(`Fetching product by ID: ${id}`);
        return await this.productRepository.findProductById(id);
    }

    async updateProduct(id: string, data: UpdateProductDto) {
        this.logger.log(`Updating product: ${id}`);
        const product = await this.productRepository.updateProduct(id, data);
        this.logger.log(`Product updated successfully: ${id}`);
        return product;
    }

    async deleteProduct(id: string) {
        this.logger.log(`Deleting product: ${id}`);
        const product = await this.productRepository.deleteProduct(id);
        this.logger.log(`Product deleted successfully: ${id}`);
        return product;
    }

    async searchProducts(filters: SearchProductsDto) {
        this.logger.log(`Searching products with filters: ${JSON.stringify(filters)}`);
        const result = await this.productRepository.searchProducts(filters);
        this.logger.log(`Search returned ${result.data.length} products (total: ${result.pagination.total})`);
        return result;
    }

    async getProductsByCategory(categoryId: string, page?: number, limit?: string) {
        this.logger.log(`Fetching products for category: ${categoryId} (page: ${page}, limit: ${limit})`);
        const result = await this.productRepository.findProductsByCategory(categoryId, page, limit);
        this.logger.log(`Found ${result.data.length} products in category ${categoryId}`);
        return result;
    }

    async getProductsBySeller(sellerId: string, page?: number, limit?: number) {
        this.logger.log(`Fetching products for seller: ${sellerId} (page: ${page}, limit: ${limit})`);
        const result = await this.productRepository.findProductsBySeller(sellerId, page, limit);
        this.logger.log(`Found ${result.data.length} products by seller ${sellerId}`);
        return result;
    }

    async getEndingSoon(limit?: string) {
        this.logger.log(`Fetching ending soon products (limit: ${limit || 10})`);
        const products = await this.productRepository.findEndingSoon(limit);
        this.logger.log(`Found ${products.length} products ending soon`);
        return products;
    }

    async getNewestProducts(limit?: string) {
        this.logger.log(`Fetching newest products (limit: ${limit || 20})`);
        const products = await this.productRepository.findNewest(limit);
        this.logger.log(`Found ${products.length} newest products`);
        return products;
    }
}
