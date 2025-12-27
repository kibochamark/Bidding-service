import { PrismaService } from '../../../src/prisma/prisma.service';
import { SubmitKycDto, UpdateKycStatusDto } from '../../../src/Controllers/Accounts/dto';
import { KycStatus } from '../../../generated/prisma/enums';
export declare class KycRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findKycByAccountId(accountId: string): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    }) | null>;
    findKycById(id: string): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    }>;
    findAllKyc(status?: KycStatus): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        verifiedAt: Date | null;
    })[]>;
    submitKyc(data: SubmitKycDto): Promise<{
        accountId: string;
        id: string;
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
        accountId: string;
        id: string;
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
        accountId: string;
        id: string;
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
