import { IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class BidJobDto {
    @IsString()
    paymentIntentId: string;

    @IsUUID()
    auctionId: string;

    @IsUUID()
    bidderId: string;

    @IsString()
    bidderName: string;

    @IsNumber()
    bidAmount: number;

    @IsNumber()
    entryFee: number;

    @IsNumber()
    totalPaid: number;

    @IsDateString()
    paidAt: Date;
}