import { AccountParamDto } from "../../../src/Controllers/Accounts/dto";
import { PrismaService } from "../../../src/prisma/prisma.service";
export declare class AccountsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findAllAccounts(): Promise<({
        kyc: {
            accountId: string;
            id: string;
            idDocumentUrl: string;
            selfieUrl: string | null;
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            userId: string;
            verifiedAt: Date | null;
        } | null;
        sellerProfile: {
            accountId: string;
            id: string;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findAccountByKindeIdRaw(kindeId: string): Promise<({
        addresses: {
            accountId: string;
            label: string | null;
            street: string;
            city: string;
            zipCode: string;
            country: string;
            id: string;
            userId: string;
        }[];
        kyc: {
            accountId: string;
            id: string;
            idDocumentUrl: string;
            selfieUrl: string | null;
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            userId: string;
            verifiedAt: Date | null;
        } | null;
        sellerProfile: {
            accountId: string;
            id: string;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findAccountByKindeId(data: AccountParamDto): Promise<{
        addresses: {
            accountId: string;
            label: string | null;
            street: string;
            city: string;
            zipCode: string;
            country: string;
            id: string;
            userId: string;
        }[];
        kyc: {
            accountId: string;
            id: string;
            idDocumentUrl: string;
            selfieUrl: string | null;
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            userId: string;
            verifiedAt: Date | null;
        } | null;
        sellerProfile: {
            accountId: string;
            id: string;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAccountFromWebhook(data: {
        kindeId: string;
    }): Promise<{
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAccount(kindeId: string, data: Partial<{
        kindeId: string;
    }>): Promise<{
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAccountByKindeId(kindeId: string): Promise<void>;
}
