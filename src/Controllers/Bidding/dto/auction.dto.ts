import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, IsEnum, IsUUID, Min } from "class-validator";
import { Type } from "class-transformer";

/**
 * DTO for creating a new auction
 */
export class CreateAuctionDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    prizeValue: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(0.01)
    entryFee: number;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;
}

/**
 * DTO for updating an existing auction
 */
export class UpdateAuctionDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsEnum(['ACTIVE', 'ENDED', 'CANCELLED', 'WINNER_DETERMINED'])
    status?: 'ACTIVE' | 'ENDED' | 'CANCELLED' | 'WINNER_DETERMINED';
}

/**
 * DTO for auction ID path parameter
 */
export class AuctionParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}
