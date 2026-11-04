import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChargeResponse, InitiateCharge } from 'src/Controllers/payments/dto/charge';

@Injectable()
export class PaymentsService {
    private readonly paystackurl;
    constructor (private readonly configService:ConfigService){
        this.paystackurl = configService.getOrThrow("PAYSTACK_CHARGE_URL", "https://api.paystack.co/charge")

    }

    // initiate a charge/ transaction
    async initiateTransaction(data: InitiateCharge){
        try{
            const paystackresponse = await fetch(this.paystackurl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.configService.getOrThrow("PAYSTACK_SECRET_KEY")}`
                },
                body: JSON.stringify(
                    data
                )
            })

            const response: ChargeResponse = await paystackresponse.json()

            return response

        }catch(e:any){

            return {
                status:500,
                message:e?.message
            }
        }

    }
}
