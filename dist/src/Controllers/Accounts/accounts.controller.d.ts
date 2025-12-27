import type * as express from 'express';
import { AccountsService } from '../../../src/Domains/Accounts/accounts.service';
import { AccountParamDto, UpdateAccountDto } from './dto/index.js';
import { ConfigService } from '@nestjs/config';
export declare class AccountsController {
    private accountsService;
    private configService;
    private jwtBodyParser;
    private readonly logger;
    constructor(accountsService: AccountsService, configService: ConfigService);
    getAllAccounts(): Promise<({
        kyc: {
            fullName: string;
            accountId: string;
            id: string;
            dateOfBirth: Date;
            alienIdNumber: string | null;
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
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createAccount(req: express.Request, res: express.Response): Promise<void>;
    deleteAccount(req: express.Request, res: express.Response): Promise<void>;
    getAccountByKindeId(params: AccountParamDto): Promise<{
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
            fullName: string;
            accountId: string;
            id: string;
            dateOfBirth: Date;
            alienIdNumber: string | null;
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
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAccountData(params: AccountParamDto, body: Partial<UpdateAccountDto>): Promise<{
        kindeId: string;
        email: string | null;
        contact: string | null;
        fullName: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
