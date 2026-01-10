import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from '../../../src/Domains/Products/product.service';
import {
    CreateProductDto,
    ProductParamDto,
    SearchProductsDto,
    UpdateProductDto,
} from './dto';
// import { KindeAuthGuard } from 'src/auth/kinde-auth.guard';
// import { CurrentUser, KindeUser } from 'src/auth/current-user.decorator';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) {}

    /**
     * POST /products
     * Create a new product listing
     * Requires authentication
     */
    @Post()
    // @UseGuards(KindeAuthGuard)
    async createProduct(
        @Body() dto: CreateProductDto,
        // @CurrentUser() user: KindeUser,
    ) {
        // Override sellerId and sellerName with authenticated user data
        // dto.sellerId = user.kindeId;
        // dto.sellerName = user.email; // You might want to get actual name from user profile

        return await this.productService.createProduct(dto);
    }

    @Get()
    async getAllProducts(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return await this.productService.getAllProducts(page, limit);
    }

    /**
     * GET /products/search
     * Search products with filters and pagination
     */
    @Get('search')
    async searchProducts(@Query() filters: SearchProductsDto) {
        return await this.productService.searchProducts(filters);
    }

    /**
     * GET /products/ending-soon
     * Get products ending within 24 hours
     */
    @Get('ending-soon')
    async getEndingSoon(@Query('limit') limit?: string) {
        return await this.productService.getEndingSoon(limit);
    }

    /**
     * GET /products/newest
     * Get newest product listings
     */
    @Get('newest')
    async getNewestProducts(@Query('limit') limit?: string) {
        return await this.productService.getNewestProducts(limit);
    }

    /**
     * GET /products/category/:categoryId
     * Get products by category
     */
    @Get('category/:categoryId')
    async getProductsByCategory(
        @Param('categoryId') categoryId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: string,
    ) {
        return await this.productService.getProductsByCategory(
            categoryId,
            page,
            limit,
        );
    }

    /**
     * GET /products/seller/:sellerId
     * Get products by seller
     */
    @Get('seller/:sellerId')
    async getProductsBySeller(
        @Param('sellerId') sellerId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return await this.productService.getProductsBySeller(
            sellerId,
            page,
            limit,
        );
    }

    /**
     * GET /products/:id
     * Get single product by ID
     */
    @Get(':id')
    async getProductById(@Param() params: ProductParamDto) {
        return await this.productService.getProductById(params.id);
    }

    /**
     * PATCH /products/:id
     * Update product
     * Requires authentication and ownership
     */
    @Patch(':id')
    // @UseGuards(KindeAuthGuard)
    async updateProduct(
        @Param() params: ProductParamDto,
        @Body() dto: UpdateProductDto,
        // @CurrentUser() user: KindeUser,
    ) {
        // TODO: Add authorization check to ensure user owns this product
        return await this.productService.updateProduct(params.id, dto);
    }

    /**
     * DELETE /products/:id
     * Delete product
     * Requires authentication and ownership
     */
    @Delete(':id')
    // @UseGuards(KindeAuthGuard)
    async deleteProduct(
        @Param() params: ProductParamDto,
        // @CurrentUser() user: KindeUser,
    ) {
        // TODO: Add authorization check to ensure user owns this product
        return await this.productService.deleteProduct(params.id);
    }
}
