import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AccountsService } from '../../../src/Domains/Accounts/accounts.service';
import { AccountParamDto, CreateAccountDto } from './dto/index.js';

@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) { }

    /**
     * Get all accounts
     * TODO: Add pagination, filtering, and authentication
     */
    @Get()
    async getAllAccounts() {
        return await this.accountsService.getAllAccounts();
    }

    /**
     * Webhook handler for Kinde user.created event
     * Creates a new account in local database when user signs up in Kinde
     */
    @Post()
    async createAccount(@Body() account: CreateAccountDto, @Headers('authorization') authHeader: string) {

        const kindewebhook= await(import('@kinde/webhooks'));

        console.log('Received webhook for account creation', account);
        
        const token = authHeader.split('Bearer')[1].trim();

        const decodedWebhook = await kindewebhook.decodeWebhook(token, "https://bidmarket.kinde.com");
        if (!decodedWebhook || decodedWebhook.type !== kindewebhook.WebhookEventType.UserCreated) {
            throw new Error('Invalid webhook event');
        }


        return await this.accountsService.createAccount(account);
    }

    /**
     * Get account by Kinde ID
     */
    @Get(':kindeId')
    async getAccountByKindeId(@Param() params: AccountParamDto) {
        return await this.accountsService.getAccountByKindeId(params);
    }
}
