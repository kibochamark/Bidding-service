import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

/**
 * DTO for creating a new address
 */
export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    accountId: string;

    @IsOptional()
    @IsString()
    label?: string; // "Home", "Office", etc.

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    country: string;
}

/**
 * DTO for updating an existing address
 */
export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    zipCode?: string;

    @IsOptional()
    @IsString()
    country?: string;
}

/**
 * DTO for address ID path parameter
 */
export class AddressParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}



