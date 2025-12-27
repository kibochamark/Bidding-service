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
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
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
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
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
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    })[]>;
    submitKyc(data: SubmitKycDto): Promise<{
        fullName: string;
        accountId: string;
        id: string;
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    }>;
    updateKycStatus(id: string, data: UpdateKycStatusDto): Promise<{
        fullName: string;
        accountId: string;
        id: string;
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    }>;
    deleteKyc(id: string): Promise<{
        fullName: string;
        accountId: string;
        id: string;
        dateOfBirth: Date;
        alienIdNumber: string | null;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    }>;
}
