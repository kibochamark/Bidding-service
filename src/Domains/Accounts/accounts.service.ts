import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from 'src/Controllers/Accounts/dto';

@Injectable()
export class AccountsService {
    constructor(
        private accountRepository: AccountsRepository,
    ) {}

    async getAllAccounts() {
        return  await this.accountRepository.findAllAccounts();
    }

    async createAccount(data: CreateAccountDto) {
        return  await this.accountRepository.createAccount(data);
    }
   
}
