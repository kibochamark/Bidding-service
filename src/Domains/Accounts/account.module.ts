import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from 'src/Controllers/Accounts/accounts.controller';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers:[AccountsService, AccountsRepository]
})
export class AccountModule {}