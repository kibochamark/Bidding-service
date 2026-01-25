export declare class PaymentIntentResponseDto {
    paymentIntentId: string;
    clientSecret: string;
    amount: number;
    currency: string;
    auctionId: string;
    bidAmount: number;
    entryFee: number;
    totalAmount: number;
}
export declare class PaymentConfirmationResponseDto {
    success: boolean;
    message: string;
    bidId?: string;
    paymentIntentId: string;
    auctionEndTime?: Date;
    warning?: string;
}
