/**
 * Response DTO for payment initiation
 */
export class PaymentIntentResponseDto {
    paymentIntentId: string;
    clientSecret: string;
    amount: number;
    currency: string;
    auctionId: string;
    bidAmount: number;
    entryFee: number;
    totalAmount: number;
}

/**
 * Response DTO for payment confirmation
 */
export class PaymentConfirmationResponseDto {
    success: boolean;
    message: string;
    bidId?: string;
    paymentIntentId: string;
    auctionEndTime?: Date;
    warning?: string; // For edge case warnings (e.g., auction ending soon)
}
