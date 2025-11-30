import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CategoryService } from 'src/Domains/Products/category.service';
import {
    CategoryParamDto,
    CategorySlugDto,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './dto';
// import { KindeAuthGuard } from 'src/auth/kinde-auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService) {}

    /**
     * POST /categories
     * Create a new category
     * Requires authentication (admin only in production)
     */
    @Post()
    // @UseGuards(KindeAuthGuard)
    async createCategory(@Body() dto: CreateCategoryDto) {
        // TODO: Add role-based authorization (admin only)
        return await this.categoryService.createCategory(dto);
    }

    /**
     * GET /categories
     * Get all categories
     */
    @Get()
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }

    /**
     * GET /categories/root
     * Get only root categories (no parent)
     */
    @Get('root')
    async getRootCategories() {
        return await this.categoryService.getRootCategories();
    }

    /**
     * GET /categories/slug/:slug
     * Get category by slug
     */
    @Get('slug/:slug')
    async getCategoryBySlug(@Param() params: CategorySlugDto) {
        return await this.categoryService.getCategoryBySlug(params.slug);
    }

    /**
     * GET /categories/:id
     * Get category by ID
     */
    @Get(':id')
    async getCategoryById(@Param() params: CategoryParamDto) {
        return await this.categoryService.getCategoryById(params.id);
    }

    /**
     * PATCH /categories/:id
     * Update category
     * Requires authentication (admin only in production)
     */
    @Patch(':id')
    // @UseGuards(KindeAuthGuard)
    async updateCategory(
        @Param() params: CategoryParamDto,
        @Body() dto: UpdateCategoryDto,
    ) {
        // TODO: Add role-based authorization (admin only)
        return await this.categoryService.updateCategory(params.id, dto);
    }

    /**
     * DELETE /categories/:id
     * Delete category
     * Requires authentication (admin only in production)
     */
    @Delete(':id')
    // @UseGuards(KindeAuthGuard)
    async deleteCategory(@Param() params: CategoryParamDto) {
        // TODO: Add role-based authorization (admin only)
        return await this.categoryService.deleteCategory(params.id);
    }
}
