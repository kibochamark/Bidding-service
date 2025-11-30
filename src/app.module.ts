import { Module } from '@nestjs/common';
import { AccountModule } from './Domains/Accounts/account.module';
import { ProductModule } from './Domains/Products/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountModule,
    ProductModule,
    PrismaModule,
  ],
})
export class AppModule {}
