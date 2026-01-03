import { AccountParamDto } from "../../../src/Controllers/Accounts/dto";
import { PrismaService } from "../../../src/prisma/prisma.service";
export declare class AccountsRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAllAccounts(): Promise<({
        kyc: {
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
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            createdAt: Date;
            updatedAt: Date;
            verifiedAt: Date | null;
        } | null;
        sellerProfile: {
            accountId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findAccountByKindeIdRaw(kindeId: string): Promise<({
        addresses: {
            accountId: string;
            phone: string;
            label: string | null;
            street: string;
            state: string;
            city: string;
            zipCode: string;
            country: string;
            isPrimary: boolean;
            recipientname: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        kyc: {
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
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            createdAt: Date;
            updatedAt: Date;
            verifiedAt: Date | null;
        } | null;
        sellerProfile: {
            accountId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findAccountByKindeId(data: AccountParamDto): Promise<{
        addresses: {
            accountId: string;
            phone: string;
            label: string | null;
            street: string;
            state: string;
            city: string;
            zipCode: string;
            country: string;
            isPrimary: boolean;
            recipientname: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        kyc: {
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
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            createdAt: Date;
            updatedAt: Date;
            verifiedAt: Date | null;
        } | null;
        sellerProfile: {
            accountId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAccountFromWebhook(data: {
        kindeId: string;
    }): Promise<{
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAccount(kindeId: string, data: Partial<{
        contact: string;
        fullName: string;
        email?: string;
    }>): Promise<{
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAccountByKindeId(kindeId: string): Promise<void>;
}
