import { KycStatus } from "generated/prisma/enums";
export declare class SubmitKycDto {
    fullName: string;
    dateOfBirth: string;
    alienIdNumber?: string;
    accountId: string;
    idDocumentUrl: string;
    selfieUrl?: string;
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
