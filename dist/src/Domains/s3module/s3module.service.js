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
var S3moduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3moduleService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let S3moduleService = S3moduleService_1 = class S3moduleService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(S3moduleService_1.name);
        cloudinary_1.v2.config({
            cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: config.get('CLOUDINARY_API_KEY'),
            api_secret: config.get('CLOUDINARY_API_SECRET'),
        });
        this.logger.log('Cloudinary configured successfully');
    }
    async uploadFile(file, folder = 'general') {
        this.logger.log(`Uploading file to Cloudinary folder: ${folder}`);
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: `bidding-service-uploads`,
                resource_type: 'auto',
                public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            }, (error, result) => {
                if (error) {
                    this.logger.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                this.logger.log(`File uploaded successfully: ${result?.secure_url}`);
                resolve(result);
            });
            uploadStream.end(file.buffer);
        });
    }
    async uploadMultipleFiles(files, folder = 'general') {
        this.logger.log(`Uploading ${files.length} files to Cloudinary`);
        const uploadPromises = files.map(file => this.uploadFile(file, folder));
        return Promise.all(uploadPromises);
    }
    async deleteFile(publicId) {
        this.logger.log(`Deleting file from Cloudinary: ${publicId}`);
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    this.logger.error('Cloudinary delete error:', error);
                    return reject(error);
                }
                this.logger.log(`File deleted successfully: ${publicId}`);
                resolve(result);
            });
        });
    }
};
exports.S3moduleService = S3moduleService;
exports.S3moduleService = S3moduleService = S3moduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3moduleService);
//# sourceMappingURL=s3module.service.js.map