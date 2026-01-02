import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

/**
 * DTO for creating a new address
 */
export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    accountId: string;



    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    recipientName: string;



    @IsOptional()
    @IsString()
    label?: string; // "Home", "Office", etc.

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsBoolean()
    isPrimary: boolean;
}

/**
 * DTO for updating an existing address
 */
export class UpdateAddressDto {

    @IsOptional()
    @IsString()
    recipientname?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    state?: string;

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


    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;
}

/**
 * DTO for address ID path parameter
 */
export class AddressParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}



