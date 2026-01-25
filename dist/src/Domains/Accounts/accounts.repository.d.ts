import { AccountParamDto } from "../../../src/Controllers/Accounts/dto";
import { PrismaService } from "../../../src/prisma/prisma.service";
export declare class AccountsRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAllAccounts(): Promise<{
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAccountByKindeIdRaw(kindeId: string): Promise<({
        addresses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accountId: string;
            recipientname: string;
            phone: string;
            label: string | null;
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            isPrimary: boolean;
        }[];
        sellerProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            accountId: string;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findAccountByKindeId(data: AccountParamDto): Promise<{
        addresses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accountId: string;
            recipientname: string;
            phone: string;
            label: string | null;
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            isPrimary: boolean;
        }[];
        sellerProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            taxId: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            totalSales: number;
            accountId: string;
            responseRate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
    } & {
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAccountFromWebhook(data: {
        kindeId: string;
    }): Promise<{
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAccount(kindeId: string, data: Partial<{
        contact: string;
        fullName: string;
        email?: string;
    }>): Promise<{
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAccountByKindeId(kindeId: string): Promise<void>;
}
