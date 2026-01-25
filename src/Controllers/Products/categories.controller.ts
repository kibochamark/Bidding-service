import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '../../../src/Domains/Products/category.service';
import {
    CategoryParamDto,
    CategorySlugDto,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3moduleService } from 'src/Domains/s3module/s3module.service';

// import { KindeAuthGuard } from 'src/auth/kinde-auth.guard';

@Controller('categories')
export class CategoriesController {
    private logger = new Logger()
    constructor(private categoryService: CategoryService ,private s3Service:S3moduleService) {}

    /**
     * POST /categories
     * Create a new category
     * Requires authentication (admin only in production)
     */
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    // @UseGuards(KindeAuthGuard)
    async createCategory(@UploadedFile() file: Express.Multer.File,@Body() dto: CreateCategoryDto) {

        this.logger.debug(file)
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        
        this.logger.log(`Uploading ${file.originalname} category image`);
        
        // Validate each file
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 8 * 1024 * 1024; // 2MB

        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type for ${file.originalname}. Only images are allowed`,
            );
        }
        if (file.size > maxSize) {
            throw new BadRequestException(
                `File ${file.originalname} exceeds 2MB size limit`,
            );
        }
                
        let results
        
        try {
            results = await this.s3Service.uploadFile(file, 'product-images');

            this.logger.debug(results)
            if(results){
                dto.icon = results.secure_url as string
            }

            // update the product with the uploaded images
        
            
            return await this.categoryService.createCategory(dto); 
        } catch (error) {
            this.logger.error('Upload failed:', error);
            // delete the file uploaded to s3
            // delete the uploaded file from Cloudinary if needed
            if (results) {

                await this.s3Service.deleteFile(results.public_id)
                
            }
            throw new BadRequestException('Failed to upload file');
        }
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
    @UseInterceptors(FileInterceptor('file'))
    // @UseGuards(KindeAuthGuard)
    async updateCategory(
        @UploadedFile() file:Express.Multer.File,
        @Param() params: CategoryParamDto,
        @Body() dto: UpdateCategoryDto,
    ) {
        let result
        if (file) {
            this.logger.log("deleting existing file")


            this.logger.log(`Uploading ${file.originalname} category image`);

            // Validate each file
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 8 * 1024 * 1024; // 2MB

            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new BadRequestException(
                    `Invalid file type for ${file.originalname}. Only images are allowed`,
                );
            }
            if (file.size > maxSize) {
                throw new BadRequestException(
                    `File ${file.originalname} exceeds 2MB size limit`,
                );
            }

            result = await this.s3Service.uploadFile(
                file, "product-images"

            )
        }
        if(result){
            dto.icon = result.secure_url as string 
        }
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
