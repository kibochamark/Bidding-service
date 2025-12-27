import { AccountsRepository } from './accounts.repository';
import { AccountParamDto, CreateAccountDto } from '../../../src/Controllers/Accounts/dto';
export declare class AccountsService {
    private accountRepository;
    private readonly logger;
    constructor(accountRepository: AccountsRepository);
    getAllAccounts(): Promise<({
        kyc: {
            accountId: string;
            id: string;
            idDocumentUrl: string;
            selfieUrl: string | null;
            status: import("../../../generated/prisma/enums").KycStatus;
            rejectionReason: string | null;
            reviewedBy: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createAccount(webhookData: CreateAccountDto): Promise<{
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAccountByKindeId(data: AccountParamDto): Promise<{
        addresses: {
            accountId: string;
            label: string | null;
            street: string;
            city: string;
            zipCode: string;
            country: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAccount(kindeId: string, data: Partial<AccountParamDto>): Promise<{
        kindeId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAccountByKindeId(kindeId: string): Promise<void>;
}
