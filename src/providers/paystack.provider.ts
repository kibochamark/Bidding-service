import { ConfigService } from "@nestjs/config";


export const PAYSTACK_CLIENT = 'PAYSTACK_CLIENT';



export const PaystackProvider = {
  provide: PAYSTACK_CLIENT,
  useFactory: (configService: ConfigService) => {
    const paystackSecretKey = configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      throw new Error('PAYSTACK_SECRET_KEY is not configured');
    }
    const { Paystack } = require('@paystack/paystack-sdk')
    return new Paystack(paystackSecretKey as string);
  },
  inject: [ConfigService],
}