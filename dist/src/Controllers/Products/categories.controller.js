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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../../../src/Domains/Products/category.service");
const dto_1 = require("./dto");
const platform_express_1 = require("@nestjs/platform-express");
const s3module_service_1 = require("../../Domains/s3module/s3module.service");
let CategoriesController = class CategoriesController {
    constructor(categoryService, s3Service) {
        this.categoryService = categoryService;
        this.s3Service = s3Service;
        this.logger = new common_1.Logger();
    }
    async createCategory(file, dto) {
        this.logger.debug(file);
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        this.logger.log(`Uploading ${file.originalname} category image`);
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 8 * 1024 * 1024;
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Invalid file type for ${file.originalname}. Only images are allowed`);
        }
        if (file.size > maxSize) {
            throw new common_1.BadRequestException(`File ${file.originalname} exceeds 2MB size limit`);
        }
        let results;
        try {
            results = await this.s3Service.uploadFile(file, 'product-images');
            this.logger.debug(results);
            if (results) {
                dto.icon = results.secure_url;
            }
            return await this.categoryService.createCategory(dto);
        }
        catch (error) {
            this.logger.error('Upload failed:', error);
            if (results) {
                await this.s3Service.deleteFile(results.public_id);
            }
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }
    async getRootCategories() {
        return await this.categoryService.getRootCategories();
    }
    async getCategoryBySlug(params) {
        return await this.categoryService.getCategoryBySlug(params.slug);
    }
    async getCategoryById(params) {
        return await this.categoryService.getCategoryById(params.id);
    }
    async updateCategory(file, params, dto) {
        let result;
        if (file) {
            this.logger.log("deleting existing file");
            this.logger.log(`Uploading ${file.originalname} category image`);
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 8 * 1024 * 1024;
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`Invalid file type for ${file.originalname}. Only images are allowed`);
            }
            if (file.size > maxSize) {
                throw new common_1.BadRequestException(`File ${file.originalname} exceeds 2MB size limit`);
            }
            result = await this.s3Service.uploadFile(file, "product-images");
        }
        if (result) {
            dto.icon = result.secure_url;
        }
        return await this.categoryService.updateCategory(params.id, dto);
    }
    async deleteCategory(params) {
        return await this.categoryService.deleteCategory(params.id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('root'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getRootCategories", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CategorySlugDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CategoryParamDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CategoryParamDto,
        dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CategoryParamDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService, s3module_service_1.S3moduleService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map