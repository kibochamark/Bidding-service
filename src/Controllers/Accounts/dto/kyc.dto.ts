import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { KycStatus } from "generated/prisma/enums";


/**
 * DTO for submitting KYC documents
 */
export class SubmitKycDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    dateOfBirth: string; // ISO date string

    @IsOptional()
    @IsString()
    alienIdNumber?: string;

    @IsNotEmpty()
    @IsString()
    accountId: string; // Will be extracted from authenticated user in production

    @IsNotEmpty()
    @IsUrl()
    idDocumentUrl: string;

    @IsOptional()
    @IsUrl()
    selfieUrl?: string;
}

/**
 * DTO for admin to update KYC status
 */
export class UpdateKycStatusDto {
    @IsNotEmpty()
    @IsEnum(KycStatus)
    status: KycStatus;

    @IsOptional()
    @IsString()
    rejectionReason?: string;

    @IsNotEmpty()
    @IsString()
    reviewedBy: string; // Kinde ID of the admin
}

/**
 * DTO for KYC ID path parameter
 */
export class KycParamDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}


export class StatusKycDto {
    @IsNotEmpty()
    @IsString()
    status: string;
}
