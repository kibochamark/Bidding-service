import { KycStatus } from "generated/prisma/enums";
export declare enum DocumentType {
    NATIONAL_ID = "NATIONAL_ID",
    PASSPORT = "PASSPORT",
    DRIVERS_LICENSE = "DRIVERS_LICENSE",
    PROOF_OF_ADDRESS = "PROOF_OF_ADDRESS",
    SELFIE = "SELFIE"
}
export declare class KycDocumentDto {
    accountId: string;
    documentType: DocumentType;
    idDocumentNumber?: string;
    idDocumentUrl?: string;
    proofOfAddressUrl?: string;
    selfieUrl?: string;
}
export declare class SubmitKycDto {
    accountId: string;
    fullName: string;
    dateOfBirth: string;
    nationality: string;
}
export declare class UpdateKycStatusDto {
    status: KycStatus;
    rejectionReason?: string;
    reviewedBy: string;
}
export declare class KycParamDto {
    id: string;
}
export declare class StatusKycDto {
    status: string;
}
