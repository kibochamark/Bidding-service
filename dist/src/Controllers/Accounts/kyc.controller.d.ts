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
        accountId: string;
        id: string;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        userId: string;
        verifiedAt: Date | null;
    })[]>;
    getKycStatus(accountId: string): Promise<({
        account: {
            kindeId: string;
            createdAt: Date;
        };
    } & {
        accountId: string;
        id: string;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        userId: string;
        verifiedAt: Date | null;
    }) | null>;
    getKycById(params: KycParamDto): Promise<{
        account: {
            kindeId: string;
            createdAt: Date;
        };
    } & {
        accountId: string;
        id: string;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        userId: string;
        verifiedAt: Date | null;
    }>;
    submitKyc(submitKycDto: SubmitKycDto): Promise<{
        accountId: string;
        id: string;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        userId: string;
        verifiedAt: Date | null;
    }>;
    updateKycStatus(params: KycParamDto, updateKycStatusDto: UpdateKycStatusDto): Promise<{
        accountId: string;
        id: string;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        userId: string;
        verifiedAt: Date | null;
    }>;
    deleteKyc(params: KycParamDto): Promise<{
        accountId: string;
        id: string;
        idDocumentUrl: string;
        selfieUrl: string | null;
        status: KycStatus;
        rejectionReason: string | null;
        reviewedBy: string | null;
        userId: string;
        verifiedAt: Date | null;
    }>;
}
