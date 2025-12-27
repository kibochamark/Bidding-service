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
let KycRepository = KycRepository_1 = class KycRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(KycRepository_1.name);
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
            this.logger.log(`Updating existing KYC profile for account ID: ${data.accountId}`);
            return await this.prisma.kycProfile.update({
                where: { id: existingKyc.id },
                data: {
                    idDocumentUrl: data.idDocumentUrl,
                    selfieUrl: data.selfieUrl,
                    status: enums_1.KycStatus.PENDING,
                    rejectionReason: null,
                    reviewedBy: null,
                    verifiedAt: null,
                },
            });
        }
        return await this.prisma.kycProfile.create({
            data: {
                userId: account.kindeId,
                accountId: account.kindeId,
                idDocumentUrl: data.idDocumentUrl,
                selfieUrl: data.selfieUrl,
                status: enums_1.KycStatus.PENDING,
                fullName: data.fullName,
                dateOfBirth: new Date(data.dateOfBirth),
                alienIdNumber: data.alienIdNumber,
            },
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
        await this.findKycById(id);
        this.logger.log(`Deleting KYC profile with ID: ${id}`);
        return await this.prisma.kycProfile.delete({
            where: { id },
        });
    }
};
exports.KycRepository = KycRepository;
exports.KycRepository = KycRepository = KycRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KycRepository);
//# sourceMappingURL=kyc.repository.js.map