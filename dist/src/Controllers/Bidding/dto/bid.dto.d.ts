export declare class InitiateBidPaymentDto {
    auctionId: string;
    bidderId: string;
    bidderName: string;
    bidAmount: number;
}
export declare class ConfirmBidPaymentDto {
    paymentIntentId: string;
}
export declare class PlaceBidDto {
    auctionId: string;
    bidderId: string;
    bidderName: string;
    bidAmount: number;
}
export declare class BidParamDto {
    id: string;
}
export declare class BidUserParamDto {
    kinde_id: string;
}
