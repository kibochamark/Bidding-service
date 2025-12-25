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
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./product.repository");
let ProductService = ProductService_1 = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger(ProductService_1.name);
    }
    async createProduct(data) {
        this.logger.log(`Creating product: ${data.title} by seller: ${data.sellerId}`);
        const product = await this.productRepository.createProduct(data);
        this.logger.log(`Product created successfully with ID: ${product.id}`);
        return product;
    }
    async getProductById(id) {
        this.logger.log(`Fetching product by ID: ${id}`);
        return await this.productRepository.findProductById(id);
    }
    async updateProduct(id, data) {
        this.logger.log(`Updating product: ${id}`);
        const product = await this.productRepository.updateProduct(id, data);
        this.logger.log(`Product updated successfully: ${id}`);
        return product;
    }
    async deleteProduct(id) {
        this.logger.log(`Deleting product: ${id}`);
        const product = await this.productRepository.deleteProduct(id);
        this.logger.log(`Product deleted successfully: ${id}`);
        return product;
    }
    async searchProducts(filters) {
        this.logger.log(`Searching products with filters: ${JSON.stringify(filters)}`);
        const result = await this.productRepository.searchProducts(filters);
        this.logger.log(`Search returned ${result.data.length} products (total: ${result.pagination.total})`);
        return result;
    }
    async getProductsByCategory(categoryId, page, limit) {
        this.logger.log(`Fetching products for category: ${categoryId} (page: ${page}, limit: ${limit})`);
        const result = await this.productRepository.findProductsByCategory(categoryId, page, limit);
        this.logger.log(`Found ${result.data.length} products in category ${categoryId}`);
        return result;
    }
    async getProductsBySeller(sellerId, page, limit) {
        this.logger.log(`Fetching products for seller: ${sellerId} (page: ${page}, limit: ${limit})`);
        const result = await this.productRepository.findProductsBySeller(sellerId, page, limit);
        this.logger.log(`Found ${result.data.length} products by seller ${sellerId}`);
        return result;
    }
    async getEndingSoon(limit) {
        this.logger.log(`Fetching ending soon products (limit: ${limit || 10})`);
        const products = await this.productRepository.findEndingSoon(limit);
        this.logger.log(`Found ${products.length} products ending soon`);
        return products;
    }
    async getNewestProducts(limit) {
        this.logger.log(`Fetching newest products (limit: ${limit || 20})`);
        const products = await this.productRepository.findNewest(limit);
        this.logger.log(`Found ${products.length} newest products`);
        return products;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map