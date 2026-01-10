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
var UploadController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const s3module_service_1 = require("../../Domains/s3module/s3module.service");
const kyc_dto_1 = require("./dto/kyc.dto");
const kyc_service_1 = require("../../Domains/Accounts/kyc.service");
const product_service_1 = require("../../Domains/Products/product.service");
let UploadController = UploadController_1 = class UploadController {
    constructor(s3Service, kycservice, productServive) {
        this.s3Service = s3Service;
        this.kycservice = kycservice;
        this.productServive = productServive;
        this.logger = new common_1.Logger(UploadController_1.name);
    }
    async uploadKycDocument(file, body) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        this.logger.log(`Uploading KYC document: ${file.originalname} for account ID: ${body.accountId}`);
        const allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'application/pdf',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed');
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size must be less than 5MB');
        }
        let result;
        try {
            result = await this.s3Service.uploadFile(file, 'kyc-documents');
            if (result.public_id && body.accountId) {
                this.logger.log(`KYC document uploaded with public ID: ${result.public_id} for account ID: ${body.accountId}`);
                await this.kycservice.uploadKycDocument(body.accountId, body.documentType, result.secure_url, body.idDocumentNumber);
            }
            return {
                success: true,
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format,
                size: result.bytes,
                message: 'KYC document uploaded successfully',
            };
        }
        catch (error) {
            this.logger.error('Upload failed:', error);
            if (result.public_id) {
                await this.s3Service.deleteFile(result.public_id);
            }
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    async uploadProductImages(files, params) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files uploaded');
        }
        this.logger.log(`Uploading ${files.length} product images`);
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 2 * 1024 * 1024;
        for (const file of files) {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`Invalid file type for ${file.originalname}. Only images are allowed`);
            }
            if (file.size > maxSize) {
                throw new common_1.BadRequestException(`File ${file.originalname} exceeds 2MB size limit`);
            }
        }
        let results;
        try {
            results = await this.s3Service.uploadMultipleFiles(files, 'product-images');
            await this.productServive.updateProduct(params.id, { images: results.map(r => r.secure_url) });
            return {
                success: true,
                count: results.length,
                urls: results.map(r => r.secure_url),
                files: results.map(r => ({
                    url: r.secure_url,
                    publicId: r.public_id,
                    format: r.format,
                    size: r.bytes,
                })),
                message: `${results.length} product images uploaded successfully`,
            };
        }
        catch (error) {
            this.logger.error('Upload failed:', error);
            if (results.length > 0) {
                results.map(async (resource) => {
                    return await this.s3Service.deleteFile(resource.public_id);
                });
            }
            throw new common_1.BadRequestException('Failed to upload file');
            throw new common_1.BadRequestException('Failed to upload product images');
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('kyc-document'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, kyc_dto_1.KycDocumentDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadKycDocument", null);
__decorate([
    (0, common_1.Post)('product-images/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadProductImages", null);
exports.UploadController = UploadController = UploadController_1 = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [s3module_service_1.S3moduleService, kyc_service_1.KycService, product_service_1.ProductService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map