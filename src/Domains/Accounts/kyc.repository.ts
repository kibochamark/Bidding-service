import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { SubmitKycDto, UpdateKycStatusDto } from '../../../src/Controllers/Accounts/dto';
import { KycStatus } from '../../../generated/prisma/enums';
import { S3moduleService } from '../s3module/s3module.service';

@Injectable()
export class KycRepository {
    private readonly logger = new Logger(KycRepository.name);
    constructor(private prisma: PrismaService, private s3moduleService: S3moduleService) {}

    /**
     * Extract Cloudinary public_id from URL
     * Example: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/file.jpg
     * Returns: folder/file
     */
    private extractPublicIdFromUrl(url: string): string | null {
        try {
            // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
            const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
            const match = url.match(regex);
            return match ? match[1] : null;
        } catch (error) {
            this.logger.warn(`Failed to extract public_id from URL: ${url}`, error);
            return null;
        }
    }

    /**
     * Find KYC profile by account kindeId
     */
    async findKycByAccountId(accountId: string) {
        this.logger.log(`Fetching KYC profile for account ID: ${accountId}`);
        return await this.prisma.kycProfile.findUnique({
            where: { accountId },
            include: {
                account: {
                    select: {
                        kindeId: true,
                        createdAt: true,
                    },
                },
            },
        });
    }

    /**
     * Find KYC profile by its own ID
     */
    async findKycById(id: string) {
        this.logger.log(`Fetching KYC profile with ID: ${id}`);
        const kyc = await this.prisma.kycProfile.findUnique({
            where: { id },
            include: {
                account: {
                    select: {
                        kindeId: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!kyc) {
            this.logger.warn(`KYC profile with ID: ${id} not found`);
            throw new NotFoundException(`KYC profile with ID ${id} not found`);
        }

        return kyc;
    }

    /**
     * Get all KYC submissions (for admin)
     */
    async findAllKyc(status?: KycStatus) {
        this.logger.log(`Fetching all KYC profiles with status: ${status || 'any'}`);
        return await this.prisma.kycProfile.findMany({
            where: status ? { status } : undefined,
            include: {
                account: {
                    select: {
                        kindeId: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: {
                verifiedAt: 'desc',
            },
        });
    }

    /**
     * Submit KYC documents for verification
     */
    async submitKyc(data: SubmitKycDto) {
        // Check if account exists
        this.logger.log(`Submitting KYC for account ID: ${data.accountId}`);
        const account = await this.prisma.account.findUnique({
            where: { kindeId: data.accountId },
        });

        if (!account) {
            this.logger.warn(`Account with ID: ${data.accountId} not found`);
            throw new NotFoundException(`Account with ID ${data.accountId} not found`);
        }

        // Check if KYC already exists
        const existingKyc = await this.prisma.kycProfile.findUnique({
            where: { accountId: account.kindeId },
        });

        if (existingKyc) {
            this.logger.log(`KYC profile already exists for account ID: ${data.accountId}`);
            // If already verified, don't allow resubmission
            if (existingKyc.status === KycStatus.VERIFIED) {
                this.logger.warn(`KYC already verified for account ID: ${data.accountId}`);
                throw new BadRequestException('KYC already verified');
            }
        }
        this.logger.log(`Creating new KYC profile for account ID: ${data.accountId}`);

        return await this.prisma.kycProfile.create({
            data: {
                accountId: account.kindeId,
                fullName: data.fullName,
                dateOfBirth: new Date(data.dateOfBirth),
                nationality: data.nationality,
                status: KycStatus.PENDING,
            }
        });
    }

    /**
     * Update KYC status (admin only)
     */
    async updateKycStatus(id: string, data: UpdateKycStatusDto) {
        const kyc = await this.findKycById(id);

        this.logger.log(`Updating KYC status for ID: ${id} to ${data.status}`);

        return await this.prisma.kycProfile.update({
            where: { id },
            data: {
                status: data.status,
                rejectionReason: data.rejectionReason,
                reviewedBy: data.reviewedBy,
                verifiedAt:
                    data.status === KycStatus.VERIFIED ? new Date() : kyc.verifiedAt,
            },
        });
    }

    /**
     * Delete KYC profile and cleanup associated files from S3
     */
    async deleteKyc(id: string) {
        // First, get the KYC profile to extract file URLs
        const kyc = await this.findKycById(id);

        this.logger.log(`Deleting KYC profile with ID: ${id}`);

        // Extract public IDs from Cloudinary URLs for cleanup
        const filePublicIds: string[] = [];

        if (kyc.idDocumentUrl) {
            const idPublicId = this.extractPublicIdFromUrl(kyc.idDocumentUrl);
            if (idPublicId) {
                filePublicIds.push(idPublicId);
                this.logger.log(`Found ID document to delete: ${idPublicId}`);
            }
        }

        if (kyc.proofOfAddressUrl) {
            const proofPublicId = this.extractPublicIdFromUrl(kyc.proofOfAddressUrl);
            if (proofPublicId) {
                filePublicIds.push(proofPublicId);
                this.logger.log(`Found proof of address to delete: ${proofPublicId}`);
            }
        }

        if (kyc.selfieUrl) {
            const selfiePublicId = this.extractPublicIdFromUrl(kyc.selfieUrl);
            if (selfiePublicId) {
                filePublicIds.push(selfiePublicId);
                this.logger.log(`Found selfie to delete: ${selfiePublicId}`);
            }
        }

        try {
            // Step 1: Delete from database first (safer - can restore files if needed)
            // Using transaction to ensure atomicity
            const deletedKyc = await this.prisma.$transaction(async (tx) => {
                return await tx.kycProfile.delete({
                    where: { id },
                });
            });

            this.logger.log(`KYC profile deleted from database: ${id}`);

            // Step 2: Delete files from Cloudinary (after successful DB deletion)
            if (filePublicIds.length > 0) {
                this.logger.log(`Deleting ${filePublicIds.length} files from Cloudinary...`);

                // Delete files in parallel for faster cleanup
                const deletePromises = filePublicIds.map(async (publicId) => {
                    try {
                        await this.s3moduleService.deleteFile(publicId);
                        this.logger.log(`Successfully deleted file from Cloudinary: ${publicId}`);
                    } catch (error) {
                        // Log error but don't fail the deletion
                        // Files might already be deleted or public_id might be invalid
                        this.logger.warn(
                            `Failed to delete file ${publicId} from Cloudinary:`,
                            error,
                        );
                    }
                });

                await Promise.allSettled(deletePromises);
                this.logger.log('Cloudinary cleanup completed');
            }

            return deletedKyc;
        } catch (error) {
            this.logger.error(`Failed to delete KYC profile ${id}:`, error);
            throw error;
        }
    }


    async uploadKycDocument(accountId: string, documentType: "NATIONAL_ID" | "PASSPORT" | "DRIVER_LICENSE" | "PROOF_OF_ADDRESS" | "SELFIE", documentUrl: string, documentIdNumber?: string) {
        this.logger.log(`Uploading KYC document for account ID: ${accountId}, type: ${documentType}`);
// based on document type, update the corresponding field

        let updateData={
        }

        if (documentType === 'NATIONAL_ID' || documentType === 'PASSPORT' || documentType === 'DRIVER_LICENSE') {
            updateData = { idDocumentUrl: documentUrl, idDocumentNumber: documentIdNumber, documentType: documentType };
        } else if (documentType === 'PROOF_OF_ADDRESS') {
            updateData = {  proofOfAddressUrl: documentUrl };
        } else if (documentType === 'SELFIE') {
            updateData = { selfieUrl: documentUrl };
        } else {
            this.logger.warn(`Invalid document type: ${documentType}`);
            throw new BadRequestException('Invalid document type');
        }


 

        return await this.prisma.kycProfile.updateMany({
            where: { accountId },
            data: {
                ...updateData
            },
        });
    }
}
