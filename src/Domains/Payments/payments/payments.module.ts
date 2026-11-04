import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({})
export class PaymentsModule {
    import: [QueueModule]
    providers:[PaymentsService]
}
