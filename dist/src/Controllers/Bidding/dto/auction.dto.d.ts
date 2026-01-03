export declare class CreateAuctionDto {
    productId: string;
    title: string;
    description: string;
    prizeValue: number;
    entryFee: number;
    endDate: string;
}
export declare class UpdateAuctionDto {
    title?: string;
    description?: string;
    endDate?: string;
    status?: 'ACTIVE' | 'ENDED' | 'CANCELLED' | 'WINNER_DETERMINED';
}
export declare class AuctionParamDto {
    id: string;
}
