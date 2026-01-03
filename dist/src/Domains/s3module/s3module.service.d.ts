import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
export declare class S3moduleService {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse>;
    uploadMultipleFiles(files: Express.Multer.File[], folder?: string): Promise<UploadApiResponse[]>;
    deleteFile(publicId: string): Promise<any>;
}
