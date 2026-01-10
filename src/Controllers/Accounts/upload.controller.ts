import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    BadRequestException,
    Logger,
    Body,
    Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3moduleService } from '../../Domains/s3module/s3module.service';
import { KycDocumentDto } from './dto/kyc.dto';
import { KycService } from 'src/Domains/Accounts/kyc.service';
import { ProductService } from 'src/Domains/Products/product.service';

@Controller('upload')
export class UploadController {
    private readonly logger = new Logger(UploadController.name);

    constructor(private s3Service: S3moduleService, private kycservice: KycService, private productServive: ProductService) {}

    /**
     * Upload a single KYC document (ID card, passport, etc.)
     * Max file size: 5MB
     * Allowed types: image/*, application/pdf
     */
    @Post('kyc-document')
    @UseInterceptors(FileInterceptor('file'))
    async uploadKycDocument(@UploadedFile() file: Express.Multer.File, @Body() body: KycDocumentDto) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        this.logger.log(`Uploading KYC document: ${file.originalname} for account ID: ${body.accountId}`);

        // Validate file type
        const allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
            'application/pdf',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                'Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed',
            );
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new BadRequestException('File size must be less than 5MB');
        }

        let result;

        try {
            result = await this.s3Service.uploadFile(file, 'kyc-documents');

            if(result.public_id && body.accountId){
                this.logger.log(`KYC document uploaded with public ID: ${result.public_id} for account ID: ${body.accountId}`);
                await this.kycservice.uploadKycDocument(body.accountId, body.documentType as "NATIONAL_ID" | "PASSPORT" | "DRIVER_LICENSE" | "PROOF_OF_ADDRESS" | "SELFIE", result.secure_url, body.idDocumentNumber);
            }

            return {
                success: true,
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format,
                size: result.bytes,
                message: 'KYC document uploaded successfully',
            };

        } catch (error) {
            this.logger.error('Upload failed:', error);
            // delete the uploaded file from Cloudinary if needed
            if (result.public_id) {
                await this.s3Service.deleteFile(result.public_id);
            }
            throw new BadRequestException('Failed to upload file');
        }
    }


   

    /**
     * Upload multiple product images
     * Max files: 10
     * Max file size per image: 2MB
     */
    @Post('product-images/:id')
    @UseInterceptors(FilesInterceptor('files', 10))
    async uploadProductImages(@UploadedFiles() files: Express.Multer.File[], @Param() params:{id:string} ) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        this.logger.log(`Uploading ${files.length} product images`);

        // Validate each file
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        for (const file of files) {
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
        }
        let results

        try {
            results = await this.s3Service.uploadMultipleFiles(files, 'product-images');

            // update the product with the uploaded images
            await this.productServive.updateProduct(params.id, {images:results.map(r => r.secure_url)})

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
        } catch (error) {
            this.logger.error('Upload failed:', error);
            // delete the file uploaded to s3
            // delete the uploaded file from Cloudinary if needed
            if (results.length > 0) {
                results.map(async (resource)=>{
                    return await this.s3Service.deleteFile(resource.public_id)
                })
                
            }
            throw new BadRequestException('Failed to upload file');
            throw new BadRequestException('Failed to upload product images');
        }
    }
}
