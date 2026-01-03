import { S3moduleService } from '../../Domains/s3module/s3module.service';
import { KycDocumentDto } from './dto/kyc.dto';
import { KycService } from 'src/Domains/Accounts/kyc.service';
export declare class UploadController {
    private s3Service;
    private kycservice;
    private readonly logger;
    constructor(s3Service: S3moduleService, kycservice: KycService);
    uploadKycDocument(file: Express.Multer.File, body: KycDocumentDto): Promise<{
        success: boolean;
        url: any;
        publicId: any;
        format: any;
        size: any;
        message: string;
    }>;
    uploadProductImages(files: Express.Multer.File[]): Promise<{
        success: boolean;
        count: number;
        urls: string[];
        files: {
            url: string;
            publicId: string;
            format: string;
            size: number;
        }[];
        message: string;
    }>;
}
