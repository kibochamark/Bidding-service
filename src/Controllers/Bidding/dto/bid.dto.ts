import { IsNotEmpty, IsString, IsNumber, IsUUID, Min } from "class-validator";
import { Type } from "class-transformer";

/**
 * DTO for initiating a bid payment
 */
export class InitiateBidPaymentDto {
    @IsNotEmpty()
    @IsString()
    auctionId: string;

    @IsNotEmpty()
    @IsString()
    bidderId: string;

    @IsNotEmpty()
    @IsString()
    bidderName: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(0.01)
    bidAmount: number;
}

/**
 * DTO for confirming a bid payment
 */
export class ConfirmBidPaymentDto {
    @IsNotEmpty()
    @IsString()
    paymentIntentId: string;
}

/**
 * DTO for placing a bid (legacy - kept for backward compatibility)
 */
export class PlaceBidDto {
    @IsNotEmpty()
    @IsString()
    auctionId: string;

    @IsNotEmpty()
    @IsString()
    bidderId: string;

    @IsNotEmpty()
    @IsString()
    bidderName: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(0.01)
    bidAmount: number;
}

/**
 * DTO for bid ID path parameter
 */
export class BidParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}


export class BidUserParamDto {
    @IsNotEmpty()
    kinde_id: string;
}
