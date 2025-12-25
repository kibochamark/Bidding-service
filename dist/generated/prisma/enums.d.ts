export declare const KycStatus: {
    readonly PENDING: "PENDING";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
    readonly NEEDS_MORE_INFO: "NEEDS_MORE_INFO";
};
export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];
export declare const ProductCondition: {
    readonly MINT: "MINT";
    readonly EXCELLENT: "EXCELLENT";
    readonly GOOD: "GOOD";
    readonly FAIR: "FAIR";
    readonly NEW: "NEW";
};
export type ProductCondition = (typeof ProductCondition)[keyof typeof ProductCondition];
