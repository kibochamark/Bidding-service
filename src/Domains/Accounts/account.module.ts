import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { AccountsController } from '../../../src/Controllers/Accounts/accounts.controller.js';
import { AddressController } from '../../../src/Controllers/Accounts/address.controller';
import { UploadController } from '../../../src/Controllers/Accounts/upload.controller';
import { S3moduleModule } from '../s3module/s3module.module';
import { ProductModule } from '../Products/product.module';

@Module({
  imports: [S3moduleModule, ProductModule],
  controllers: [AccountsController, AddressController,  UploadController],
  providers: [
    AccountsService,
    AccountsRepository,
    AddressService,
    AddressRepository,
  ],
})
export class AccountModule {}