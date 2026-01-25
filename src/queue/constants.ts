export const QUEUE_NAMES = {
    BID_PROCESSING: 'bid-processing',
    // Add more queues here as needed
    // EMAIL_NOTIFICATIONS: 'email-notifications',
    // AUCTION_ENDING: 'auction-ending',
} as const;

export const JOB_NAMES = {
    PROCESS_BID: 'process-bid',
    RECALCULATE_WINNER: 'recalculate-winner',
} as const;