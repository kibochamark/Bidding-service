import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { AccountParamDto, CreateAccountDto } from 'src/Controllers/Accounts/dto';

@Injectable()
export class AccountsService {
    private readonly logger = new Logger(AccountsService.name);

    constructor(private accountRepository: AccountsRepository) {}

    async getAllAccounts() {
        return await this.accountRepository.findAllAccounts();
    }

    /**
     * Handle Kinde webhook for user creation
     * Syncs user from Kinde to local database
     */
    async createAccount(webhookData: CreateAccountDto) {
        this.logger.log(`Received webhook: ${webhookData.type}`);

        // Validate webhook type
        if (webhookData.type !== 'user.created') {
            this.logger.warn(`Unhandled webhook type: ${webhookData.type}`);
            throw new BadRequestException(`Unsupported webhook type: ${webhookData.type}`);
        }

        const kindeUser = webhookData.data.user;
        this.logger.log(`Creating account for Kinde user: ${kindeUser.id}`);

        // Check if user already exists
        const existingAccount = await this.accountRepository.findAccountByKindeIdRaw(
            kindeUser.id,
        );

        if (existingAccount) {
            this.logger.log(`Account already exists for Kinde ID: ${kindeUser.id}`);
            return existingAccount;
        }

        // Create new account
        return await this.accountRepository.createAccountFromWebhook({
            kindeId: kindeUser.id,
        });
    }

    async getAccountByKindeId(data: AccountParamDto) {
        return await this.accountRepository.findAccountByKindeId(data);
    }

    // updateAccount and deleteAccount methods can be added here in the future
    async updateAccount( kindeId:string, data:Partial<AccountParamDto>) {
        // check if id exists
        const existingAccount = await this.accountRepository.findAccountByKindeIdRaw(
            kindeId,
        );

        if (!existingAccount) {
            this.logger.warn(`Account not found for Kinde ID: ${kindeId}`);
            throw new BadRequestException(`Account not found for Kinde ID: ${kindeId}`);
        }

        // Update logic to be implemented
        this.logger.log(`Update account with : ${kindeId}`);

        return await this.accountRepository.updateAccount(kindeId, data);
    }

    async deleteAccountByKindeId(kindeId: string) {
        // check if id exists
        const existingAccount = await this.accountRepository.findAccountByKindeIdRaw(
            kindeId,
        );

        if (!existingAccount) {
            this.logger.warn(`Account not found for Kinde ID: ${kindeId}`);
            throw new BadRequestException(`Account not found for Kinde ID: ${kindeId}`);
        }

        // Delete logic to be implemented
        this.logger.log(`Delete account with : ${kindeId}`);

        return await this.accountRepository.deleteAccountByKindeId(kindeId);
    }
}
