import { Body, Controller, Get, Headers, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { AccountsService } from '../../../src/Domains/Accounts/accounts.service';
import { AccountParamDto, CreateAccountDto } from './dto/index.js';
import * as bodyParser from 'body-parser';

@Controller('accounts')
export class AccountsController {
    private jwtBodyParser = bodyParser.text({ type: 'application/jwt' });
    private readonly logger = new Logger(AccountsController.name);

    constructor(private accountsService: AccountsService, ) { }

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
    async createAccount(@Req() req: Request, @Res() res: Response) {

        this.jwtBodyParser(req, res, async() => {
            const token  = req.body as unknown; // now contains raw JWT string

            console.log('Received webhook with token:', token);

            try {
                const kindewebhook = await(import('@kinde/webhooks'));


                const decodedWebhook = await kindewebhook.decodeWebhook(token as string, "https://bidmarket.kinde.com");

                if (!decodedWebhook || decodedWebhook.type !== kindewebhook.WebhookEventType.UserCreated) {
                    throw new Error('Invalid webhook event');
                }


                console.log('Decoded webhook:', decodedWebhook);


                this.logger.log(`Processing Kinde webhook of type: ${JSON.stringify(decodedWebhook)}`);

                

                const account: CreateAccountDto = {
                    type: decodedWebhook.type,
                    ...decodedWebhook.data
                };

                return await this.accountsService.createAccount(account);
            } catch (error) {
                return { error: 'Failed to process webhook', details: error.message };
            }
        });
    }

    /**
     * Get account by Kinde ID
     */
    @Get(':kindeId')
    async getAccountByKindeId(@Param() params: AccountParamDto) {
        return await this.accountsService.getAccountByKindeId(params);
    }
}
