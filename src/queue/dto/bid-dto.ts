import { IsString, IsNumber, IsDateString, IsUUID, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class BidJobDto {
    @IsString()
    paymentIntentId: string;

    @IsString()
    @IsOptional()
    auctionTitle:string

    @IsUUID()
    auctionId: string;

    @IsUUID()
    bidderId: string;

    @IsString()
    bidderName: string;

    /**
     * One payment can cover multiple bid entries (lowest-unique-bid guesses).
     * One Bid row is created per amount, each attributed entryFee of the total.
     */
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    bidAmounts: number[];

    /** Entry fee per bid, i.e. the share of totalPaid attributable to one bid. */
    @IsNumber()
    entryFee: number;

    /** Total amount actually paid for this payment (entryFee * bidAmounts.length). */
    @IsNumber()
    totalPaid: number;

    @IsDateString()
    @IsOptional()
    paidAt: Date;
}
