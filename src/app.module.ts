import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AccountModule } from './Domains/Accounts/account.module';
import { ProductModule } from './Domains/Products/product.module';
import { BiddingModule } from './Domains/Bidding/bidding.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { S3moduleModule } from './Domains/s3module/s3module.module';
import { ScheduleModule } from "@nestjs/schedule"
import { NotificationsModule } from './notifications/notifications.module';
import { RbacGuard } from './Guards';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AccountModule,
    ProductModule,
    BiddingModule, // BiddingModule imports QueueModule internally
    PrismaModule,
    S3moduleModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RbacGuard,
    },
  ],
})
export class AppModule {}
