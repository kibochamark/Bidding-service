"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionStatus = exports.ProductCondition = exports.DocumentType = exports.KycStatus = void 0;
exports.KycStatus = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
    NEEDS_MORE_INFO: 'NEEDS_MORE_INFO'
};
exports.DocumentType = {
    NATIONAL_ID: 'NATIONAL_ID',
    PASSPORT: 'PASSPORT',
    DRIVERS_LICENSE: 'DRIVERS_LICENSE',
    SELFIE: 'SELFIE',
    PROOF_OF_ADDRESS: 'PROOF_OF_ADDRESS'
};
exports.ProductCondition = {
    MINT: 'MINT',
    EXCELLENT: 'EXCELLENT',
    GOOD: 'GOOD',
    FAIR: 'FAIR',
    NEW: 'NEW'
};
exports.AuctionStatus = {
    ACTIVE: 'ACTIVE',
    ENDED: 'ENDED',
    CANCELLED: 'CANCELLED',
    WINNER_DETERMINED: 'WINNER_DETERMINED'
};
//# sourceMappingURL=enums.js.map