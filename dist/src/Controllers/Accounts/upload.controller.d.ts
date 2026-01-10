import { S3moduleService } from '../../Domains/s3module/s3module.service';
import { KycDocumentDto } from './dto/kyc.dto';
import { KycService } from 'src/Domains/Accounts/kyc.service';
import { ProductService } from 'src/Domains/Products/product.service';
export declare class UploadController {
    private s3Service;
    private kycservice;
    private productServive;
    private readonly logger;
    constructor(s3Service: S3moduleService, kycservice: KycService, productServive: ProductService);
    uploadKycDocument(file: Express.Multer.File, body: KycDocumentDto): Promise<{
        success: boolean;
        url: any;
        publicId: any;
        format: any;
        size: any;
        message: string;
    }>;
    uploadProductImages(files: Express.Multer.File[], params: {
        id: string;
    }): Promise<{
        success: boolean;
        count: any;
        urls: any;
        files: any;
        message: string;
    }>;
}
