import { AccountsRepository } from './accounts.repository';
import { AccountParamDto, CreateAccountDto, UpdateAccountDto } from '../../../src/Controllers/Accounts/dto';
export declare class AccountsService {
    private accountRepository;
    private readonly logger;
    constructor(accountRepository: AccountsRepository);
    getAllAccounts(): Promise<{
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createAccount(webhookData: CreateAccountDto): Promise<{
        id: string;
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAccountByKindeId(data: AccountParamDto): Promise<{
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
    updateAccount(kindeId: string, data: Partial<UpdateAccountDto>): Promise<{
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
