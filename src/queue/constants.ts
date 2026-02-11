export const QUEUE_NAMES = {
    BID_PROCESSING: 'bid-processing',
    AUCTION_FINALIZATION: 'auction-finalization',
} as const;

export const JOB_NAMES = {
    PROCESS_BID: 'process-bid',
    FINALIZE_AUCTION: 'finalize-auction',
} as const;