export interface InitiateCharge {
    amount: string | number;
    email: string;
    currency: Currency;
    mobile_money: {
        phone: string,
        provider: Provider
    },
    metadata?: {
        [key: string]: any;
    }
}


export interface ChargeResponse {
    status: boolean;
    message: string;
    data: {
        reference: string;
        status: string;
        display_text: string;
    }
}

type Provider = "mtn" |"mpesa"
type Currency = "KES"