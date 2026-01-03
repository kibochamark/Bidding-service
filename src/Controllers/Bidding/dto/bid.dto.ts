import { IsNotEmpty, IsString, IsNumber, IsUUID, Min } from "class-validator";
import { Type } from "class-transformer";

/**
 * DTO for placing a bid
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
