import { PrismaService } from '../../../src/prisma/prisma.service';
import { SubmitKycDto, UpdateKycStatusDto } from '../../../src/Controllers/Accounts/dto';
import { KycStatus } from '../../../generated/prisma/enums';
import { S3moduleService } from '../s3module/s3module.service';
export declare class KycRepository {
    private prisma;
    private s3moduleService;
    private readonly logger;
    constructor(prisma: PrismaService, s3moduleService: S3moduleService);
    private extractPublicIdFromUrl;
    findKycByAccountId(accountId: string): Promise<({
        account: {
            kindeId: string;
            createdAt: Date;
        };
    } & {
        fullName: string;
        accountId: string;
        id: string;
        documentType: import("../../../generated/prisma/enums").DocumentType | null;
        idDocumentNumber: string | null;
        idDocumentUrl: string | null;
        proofOfAddressUrl: string | null;
        selfieUrl: string | null;
        dateOfBirth: Date;
        nationality: string;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        verifiedAt: Date | null;
    }) | null>;
    findKycById(id: string): Promise<{
        account: {
            kindeId: string;
            createdAt: Date;
        };
    } & {
        fullName: string;
        accountId: string;
        id: string;
        documentType: import("../../../generated/prisma/enums").DocumentType | null;
        idDocumentNumber: string | null;
        idDocumentUrl: string | null;
        proofOfAddressUrl: string | null;
        selfieUrl: string | null;
        dateOfBirth: Date;
        nationality: string;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        verifiedAt: Date | null;
    }>;
    findAllKyc(status?: KycStatus): Promise<({
        account: {
            kindeId: string;
            createdAt: Date;
        };
    } & {
        fullName: string;
        accountId: string;
        id: string;
        documentType: import("../../../generated/prisma/enums").DocumentType | null;
        idDocumentNumber: string | null;
        idDocumentUrl: string | null;
        proofOfAddressUrl: string | null;
        selfieUrl: string | null;
        dateOfBirth: Date;
        nationality: string;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        verifiedAt: Date | null;
    })[]>;
    submitKyc(data: SubmitKycDto): Promise<{
        fullName: string;
        accountId: string;
        id: string;
        documentType: import("../../../generated/prisma/enums").DocumentType | null;
        idDocumentNumber: string | null;
        idDocumentUrl: string | null;
        proofOfAddressUrl: string | null;
        selfieUrl: string | null;
        dateOfBirth: Date;
        nationality: string;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        verifiedAt: Date | null;
    }>;
    updateKycStatus(id: string, data: UpdateKycStatusDto): Promise<{
        fullName: string;
        accountId: string;
        id: string;
        documentType: import("../../../generated/prisma/enums").DocumentType | null;
        idDocumentNumber: string | null;
        idDocumentUrl: string | null;
        proofOfAddressUrl: string | null;
        selfieUrl: string | null;
        dateOfBirth: Date;
        nationality: string;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        verifiedAt: Date | null;
    }>;
    deleteKyc(id: string): Promise<{
        fullName: string;
        accountId: string;
        id: string;
        documentType: import("../../../generated/prisma/enums").DocumentType | null;
        idDocumentNumber: string | null;
        idDocumentUrl: string | null;
        proofOfAddressUrl: string | null;
        selfieUrl: string | null;
        dateOfBirth: Date;
        nationality: string;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        verifiedAt: Date | null;
    }>;
    uploadKycDocument(accountId: string, documentType: "NATIONAL_ID" | "PASSPORT" | "DRIVER_LICENSE" | "PROOF_OF_ADDRESS" | "SELFIE", documentUrl: string, documentIdNumber?: string): Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
