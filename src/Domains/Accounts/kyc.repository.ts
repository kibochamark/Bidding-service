import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { SubmitKycDto, UpdateKycStatusDto } from '../../../src/Controllers/Accounts/dto';
import { KycStatus } from '../../../generated/prisma/enums';

@Injectable()
export class KycRepository {
    private readonly logger = new Logger(KycRepository.name);
    constructor(private prisma: PrismaService) {}

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

            this.logger.log(`Updating existing KYC profile for account ID: ${data.accountId}`);
            // Update existing KYC
            return await this.prisma.kycProfile.update({
                where: { id: existingKyc.id },
                data: {
                    idDocumentUrl: data.idDocumentUrl,
                    selfieUrl: data.selfieUrl,
                    status: KycStatus.PENDING,
                    rejectionReason: null,
                    reviewedBy: null,
                    verifiedAt: null,
                },
            });
        }

        // Create new KYC
        return await this.prisma.kycProfile.create({
            data: {
                userId: account.kindeId,
                accountId: account.kindeId,
                idDocumentUrl: data.idDocumentUrl,
                selfieUrl: data.selfieUrl,
                status: KycStatus.PENDING,
            },
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
     * Delete KYC profile
     */
    async deleteKyc(id: string) {
        await this.findKycById(id);

        this.logger.log(`Deleting KYC profile with ID: ${id}`);

        return await this.prisma.kycProfile.delete({
            where: { id },
        });
    }
}
