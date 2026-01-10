import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { KycService } from './kyc.service';
import { KycRepository } from './kyc.repository';
import { AccountsController } from '../../../src/Controllers/Accounts/accounts.controller.js';
import { AddressController } from '../../../src/Controllers/Accounts/address.controller';
import { KycController } from '../../../src/Controllers/Accounts/kyc.controller';
import { UploadController } from '../../../src/Controllers/Accounts/upload.controller';
import { S3moduleModule } from '../s3module/s3module.module';
import { ProductModule } from '../Products/product.module';

@Module({
  imports: [S3moduleModule, ProductModule],
  controllers: [AccountsController, AddressController, KycController, UploadController],
  providers: [
    AccountsService,
    AccountsRepository,
    AddressService,
    AddressRepository,
    KycService,
    KycRepository,
  ],
})
export class AccountModule {}