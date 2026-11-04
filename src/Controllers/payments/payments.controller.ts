import { InjectQueue } from '@nestjs/bullmq';
import { Controller, ForbiddenException, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { PaymentsService } from 'src/Domains/Payments/payments/payments.service';
import { JOB_NAMES } from 'src/queue/constants';

@Controller('payments')
export class PaymentsController {
    private crypto = require('crypto'); 
    constructor(
        private readonly paymentsService: PaymentsService,
         private readonly configService: ConfigService,
         @InjectQueue(JOB_NAMES.PROCESS_BID) private bidQueue: Queue,

        
        ) {}
    


    @Post('paystack/events')
    async handlePaystackEvent(@Req() req: any) {
        // Handle Paystack webhook events here
        // paystack uses HMAC SHA512 for signing the webhook payload. You can verify the signature using your secret key.

        // validate the event and process it accordingly
        const hash = this.crypto.createHmac('sha512', this.configService.get('PAYSTACK_SECRET')).update(req.rawBody).digest('hex');

        if (hash == req.headers['x-paystack-signature']) {
            // Retrieve the request's body
            const event = req.body;
            // send this to a queue for processing

            await this.bidQueue.add(JOB_NAMES.PROCESS_BID, event);

            return {
                status: 'success',
                message: 'Event received and queued for processing',
            };

        }


        throw new HttpException({
            status:HttpStatus.FORBIDDEN,
            error:"Invalid signature"
        }, HttpStatus.FORBIDDEN
        );

    }
}
