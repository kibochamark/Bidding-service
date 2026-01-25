import { Module } from '@nestjs/common';
import { AccountModule } from './Domains/Accounts/account.module';
import { ProductModule } from './Domains/Products/product.module';
import { BiddingModule } from './Domains/Bidding/bidding.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { S3moduleModule } from './Domains/s3module/s3module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountModule,
    ProductModule,
    BiddingModule, // BiddingModule imports QueueModule internally
    PrismaModule,
    S3moduleModule,
  ],
})
export class AppModule {}
