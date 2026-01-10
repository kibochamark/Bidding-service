import { KycService } from '../../../src/Domains/Accounts/kyc.service';
import { KycParamDto, SubmitKycDto, UpdateKycStatusDto } from './dto';
import { KycStatus } from '../../../generated/prisma/enums';
export declare class KycController {
    private kycService;
    constructor(kycService: KycService);
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
    getKycStatus(accountId: string): Promise<({
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
    getKycById(params: KycParamDto): Promise<{
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
    getKycStatusById(params: KycParamDto): Promise<({
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
    submitKyc(submitKycDto: SubmitKycDto): Promise<{
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
    updateKycStatus(params: KycParamDto, updateKycStatusDto: UpdateKycStatusDto): Promise<{
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
    deleteKyc(params: KycParamDto): Promise<{
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
}
