import { IsString, IsNumber, IsDateString, IsUUID, IsOptional } from 'class-validator';

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

    @IsNumber()
    bidAmount: number;

    @IsNumber()
    entryFee: number;

    @IsNumber()
    totalPaid: number;

    @IsDateString()
    paidAt: Date;
}