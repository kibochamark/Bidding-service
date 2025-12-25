import { KycStatus } from "generated/prisma/enums";
export declare class SubmitKycDto {
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
