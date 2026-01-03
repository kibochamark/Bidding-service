export declare const KycStatus: {
    readonly PENDING: "PENDING";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
    readonly NEEDS_MORE_INFO: "NEEDS_MORE_INFO";
};
export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];
export declare const DocumentType: {
    readonly NATIONAL_ID: "NATIONAL_ID";
    readonly PASSPORT: "PASSPORT";
    readonly DRIVERS_LICENSE: "DRIVERS_LICENSE";
};
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
export declare const ProductCondition: {
    readonly MINT: "MINT";
    readonly EXCELLENT: "EXCELLENT";
    readonly GOOD: "GOOD";
    readonly FAIR: "FAIR";
    readonly NEW: "NEW";
};
export type ProductCondition = (typeof ProductCondition)[keyof typeof ProductCondition];
export declare const AuctionStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ENDED: "ENDED";
    readonly CANCELLED: "CANCELLED";
    readonly WINNER_DETERMINED: "WINNER_DETERMINED";
};
export type AuctionStatus = (typeof AuctionStatus)[keyof typeof AuctionStatus];
