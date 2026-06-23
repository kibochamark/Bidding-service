import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PaymentNotificationController } from 'src/Controllers/payments/paymentnotification.controller';

@Module({
  providers: [NotificationsService],
  controllers:[PaymentNotificationController]
})
export class NotificationsModule {}
