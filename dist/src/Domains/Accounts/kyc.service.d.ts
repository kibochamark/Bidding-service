import { KycRepository } from './kyc.repository';
import { SubmitKycDto, UpdateKycStatusDto } from '../../../src/Controllers/Accounts/dto';
import { KycStatus } from '../../../generated/prisma/enums';
export declare class KycService {
    private kycRepository;
    private readonly logger;
    constructor(kycRepository: KycRepository);
    getKycByAccountId(accountId: string): Promise<({
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
    getKycById(id: string): Promise<{
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
    getAllKyc(status?: KycStatus): Promise<({
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
