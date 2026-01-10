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
var KycRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
const enums_1 = require("../../../generated/prisma/enums");
const s3module_service_1 = require("../s3module/s3module.service");
let KycRepository = KycRepository_1 = class KycRepository {
    constructor(prisma, s3moduleService) {
        this.prisma = prisma;
        this.s3moduleService = s3moduleService;
        this.logger = new common_1.Logger(KycRepository_1.name);
    }
    extractPublicIdFromUrl(url) {
        try {
            const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
            const match = url.match(regex);
            return match ? match[1] : null;
        }
        catch (error) {
            this.logger.warn(`Failed to extract public_id from URL: ${url}`, error);
            return null;
        }
    }
    async findKycByAccountId(accountId) {
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
    async findKycById(id) {
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
            throw new common_1.NotFoundException(`KYC profile with ID ${id} not found`);
        }
        return kyc;
    }
    async findAllKyc(status) {
        let query = {};
        if (status) {
            where: status;
        }
        this.logger.log(`Fetching all KYC profiles with status: ${status || 'any'}`);
        return await this.prisma.kycProfile.findMany({
            where: {
                ...query
            },
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
    async submitKyc(data) {
        this.logger.log(`Submitting KYC for account ID: ${data.accountId}`);
        const account = await this.prisma.account.findUnique({
            where: { kindeId: data.accountId },
        });
        if (!account) {
            this.logger.warn(`Account with ID: ${data.accountId} not found`);
            throw new common_1.NotFoundException(`Account with ID ${data.accountId} not found`);
        }
        const existingKyc = await this.prisma.kycProfile.findUnique({
            where: { accountId: account.kindeId },
        });
        if (existingKyc) {
            this.logger.log(`KYC profile already exists for account ID: ${data.accountId}`);
            if (existingKyc.status === enums_1.KycStatus.VERIFIED) {
                this.logger.warn(`KYC already verified for account ID: ${data.accountId}`);
                throw new common_1.BadRequestException('KYC already verified');
            }
        }
        this.logger.log(`Creating new KYC profile for account ID: ${data.accountId}`);
        return await this.prisma.kycProfile.create({
            data: {
                accountId: account.kindeId,
                fullName: data.fullName,
                dateOfBirth: new Date(data.dateOfBirth),
                nationality: data.nationality,
                status: enums_1.KycStatus.PENDING,
            }
        });
    }
    async updateKycStatus(id, data) {
        const kyc = await this.findKycById(id);
        this.logger.log(`Updating KYC status for ID: ${id} to ${data.status}`);
        return await this.prisma.kycProfile.update({
            where: { id },
            data: {
                status: data.status,
                rejectionReason: data.rejectionReason,
                reviewedBy: data.reviewedBy,
                verifiedAt: data.status === enums_1.KycStatus.VERIFIED ? new Date() : kyc.verifiedAt,
            },
        });
    }
    async deleteKyc(id) {
        const kyc = await this.findKycById(id);
        this.logger.log(`Deleting KYC profile with ID: ${id}`);
        const filePublicIds = [];
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
            const deletedKyc = await this.prisma.$transaction(async (tx) => {
                return await tx.kycProfile.delete({
                    where: { id },
                });
            });
            this.logger.log(`KYC profile deleted from database: ${id}`);
            if (filePublicIds.length > 0) {
                this.logger.log(`Deleting ${filePublicIds.length} files from Cloudinary...`);
                const deletePromises = filePublicIds.map(async (publicId) => {
                    try {
                        await this.s3moduleService.deleteFile(publicId);
                        this.logger.log(`Successfully deleted file from Cloudinary: ${publicId}`);
                    }
                    catch (error) {
                        this.logger.warn(`Failed to delete file ${publicId} from Cloudinary:`, error);
                    }
                });
                await Promise.allSettled(deletePromises);
                this.logger.log('Cloudinary cleanup completed');
            }
            return deletedKyc;
        }
        catch (error) {
            this.logger.error(`Failed to delete KYC profile ${id}:`, error);
            throw error;
        }
    }
    async uploadKycDocument(accountId, documentType, documentUrl, documentIdNumber) {
        this.logger.log(`Uploading KYC document for account ID: ${accountId}, type: ${documentType}`);
        let updateData = {};
        if (documentType === 'NATIONAL_ID' || documentType === 'PASSPORT' || documentType === 'DRIVER_LICENSE') {
            updateData = { idDocumentUrl: documentUrl, idDocumentNumber: documentIdNumber, documentType: documentType };
        }
        else if (documentType === 'PROOF_OF_ADDRESS') {
            updateData = { proofOfAddressUrl: documentUrl };
        }
        else if (documentType === 'SELFIE') {
            updateData = { selfieUrl: documentUrl };
        }
        else {
            this.logger.warn(`Invalid document type: ${documentType}`);
            throw new common_1.BadRequestException('Invalid document type');
        }
        return await this.prisma.kycProfile.updateMany({
            where: { accountId },
            data: {
                ...updateData
            },
        });
    }
};
exports.KycRepository = KycRepository;
exports.KycRepository = KycRepository = KycRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, s3module_service_1.S3moduleService])
], KycRepository);
//# sourceMappingURL=kyc.repository.js.map