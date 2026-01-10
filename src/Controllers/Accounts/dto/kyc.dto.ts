import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { KycStatus } from "generated/prisma/enums";

/**
 * Document type enum for KYC verification
 */
export enum DocumentType {
    NATIONAL_ID = 'NATIONAL_ID',
    PASSPORT = 'PASSPORT',
    DRIVERS_LICENSE = 'DRIVERS_LICENSE',
    PROOF_OF_ADDRESS = 'PROOF_OF_ADDRESS',
    SELFIE = 'SELFIE',
}


export class KycDocumentDto {
    @IsNotEmpty()
    @IsString()
    accountId: string;

    @IsNotEmpty()
    @IsEnum(DocumentType)
    @IsString()
    documentType: DocumentType;

    @IsOptional()
    @IsString()
    idDocumentNumber?: string; // ID/Passport/License number

    @IsOptional()
    @IsUrl()
    idDocumentUrl?: string;

    @IsOptional()
    @IsUrl()
    proofOfAddressUrl?: string;

    @IsOptional()
    @IsUrl()
    selfieUrl?: string;
}

/**
 * DTO for submitting KYC documents
 */
export class SubmitKycDto {
    @IsNotEmpty()
    @IsString()
    accountId: string; // Will be extracted from authenticated user in production

    @IsNotEmpty()
    @IsString()
    fullName: string; // Full name as on ID document

    @IsNotEmpty()
    @IsString()
    dateOfBirth: string; // ISO date string (YYYY-MM-DD)

    @IsNotEmpty()
    @IsString()
    nationality: string;

    // @IsOptional()
    // @IsEnum(DocumentType)
    // documentType: DocumentType; // Type of ID document (NATIONAL_ID, PASSPORT, DRIVERS_LICENSE)

    // @IsOptional()
    // @IsString()
    // idDocumentNumber: string; // ID/Passport/License number
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
    @IsString()
    id: string;
}


export class StatusKycDto {
    @IsNotEmpty()
    @IsString()
    status: string;
}
