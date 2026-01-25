import { S3moduleService } from '../../Domains/s3module/s3module.service';
import { ProductService } from 'src/Domains/Products/product.service';
export declare class UploadController {
    private s3Service;
    private productServive;
    private readonly logger;
    constructor(s3Service: S3moduleService, productServive: ProductService);
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
