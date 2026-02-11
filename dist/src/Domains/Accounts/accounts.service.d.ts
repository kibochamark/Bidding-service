import { AccountsRepository } from './accounts.repository';
import { AccountParamDto, CreateAccountDto, UpdateAccountDto } from '../../../src/Controllers/Accounts/dto';
export declare class AccountsService {
    private accountRepository;
    private readonly logger;
    constructor(accountRepository: AccountsRepository);
    getAllAccounts(): Promise<{
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createAccount(webhookData: CreateAccountDto): Promise<{
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAccountByKindeId(data: AccountParamDto): Promise<{
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
    updateAccount(kindeId: string, data: Partial<UpdateAccountDto>): Promise<{
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
