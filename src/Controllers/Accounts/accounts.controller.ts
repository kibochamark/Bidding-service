import { Body, Controller, Get, Headers, Logger, Param, Post, Req, Res } from '@nestjs/common';
import type * as express from 'express';
import { AccountsService } from '../../../src/Domains/Accounts/accounts.service';
import { AccountParamDto, CreateAccountDto } from './dto/index.js';
import * as bodyParser from 'body-parser';
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';

@Controller('accounts')
export class AccountsController {
    private jwtBodyParser = bodyParser.text({ type: 'application/jwt' });
    private readonly logger = new Logger(AccountsController.name);

    constructor(private accountsService: AccountsService, private configService:ConfigService ) { }

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
    @Post('createwebhook')
    async createAccount(@Req() req: express.Request, @Res() res: express.Response) {
 

        this.jwtBodyParser(req, res, async() => {
            try {
                const token  = req.body as unknown; // now contains raw JWT string

                // console.log('Received webhook with token:', token);

                const client = jwksClient({
                    jwksUri: this.configService.get('KINDE_JWKS_URI', 'https://bidmarket.kinde.com/.well-known/jwks.json'),
                });

                // / Decode the token
                const { header } = jwt.decode(token as string, { complete: true }) as any;
                const { kid } = header;

                // Verify the token
                const key = await client.getSigningKey(kid);
                const signingKey = key.getPublicKey();
                const event = await jwt.verify(token as string, signingKey) as any;


                // console.log('Verified webhook event:', event);

                switch (event.type) {
                    case 'user.created':
                        this.logger.log('Processing user.created event');

                        const account: CreateAccountDto = {
                            type: event.type,
                            ...event.data?.user
                        };

                        const result = await this.accountsService.createAccount(account);
                        return res.status(201).json({ success: true, data: result });
                    default:
                        this.logger.warn(`Unhandled webhook event type: ${event.type}`);
                        return res.status(400).json({ error: 'Unhandled event type', type: event.type });
                }
            } catch (error) {
                this.logger.error('Failed to process webhook', error);
                return res.status(500).json({ error: 'Failed to process webhook', details: error.message });
            }
        });
    }



    @Post('deletewebhook')
    async deleteAccount(@Req() req: express.Request, @Res() res: express.Response) {

        this.jwtBodyParser(req, res, async () => {
            try {
                const token = req.body as unknown; // now contains raw JWT string

                // console.log('Received webhook with token:', token);

                const client = jwksClient({
                    jwksUri: `https://bidmarket.kinde.com/.well-known/jwks.json`,
                });

                // / Decode the token
                const { header } = jwt.decode(token as string, { complete: true }) as any;
                const { kid } = header;

                // Verify the token
                const key = await client.getSigningKey(kid);
                const signingKey = key.getPublicKey();
                const event = await jwt.verify(token as string, signingKey) as any;


                // console.log('Verified webhook event:', event);

                switch (event.type) {
                    case 'user.deleted':
                        this.logger.log('Processing user.deleted event');
                        await this.accountsService.deleteAccountByKindeId(event.data.user.id);
                        return res.status(200).json({ success: true, message: 'Account deleted successfully' });
                    default:
                        this.logger.warn(`Unhandled webhook event type: ${event.type}`);
                        return res.status(400).json({ error: 'Unhandled event type', type: event.type });
                }
            } catch (error) {
                this.logger.error('Failed to process webhook', error);
                return res.status(500).json({ error: 'Failed to process webhook', details: error.message });
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
