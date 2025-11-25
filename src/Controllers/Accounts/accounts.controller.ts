import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from 'src/Domains/Accounts/accounts.service';
import { CreateAccountDto } from './dto';

@Controller('accounts')
export class AccountsController {
    // Controller methods would go here
    constructor(private accountsService: AccountsService) { }

    @Get("")
    async getAllAccounts() {
        return await this.accountsService.getAllAccounts();
    }


    @Post("")
    async createAccount(@Body() account:CreateAccountDto) {
        // Logic to create an account
        return await this.accountsService.createAccount(account);
    }

}
