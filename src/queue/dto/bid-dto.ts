import { IsString, IsNumber, IsDateString, IsUUID, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class BidJobDto {
    /** Canonical Stripe PaymentIntent id (falls back to a Checkout Session id if none exists). */
    @IsString()
    paymentIntentId: string;

    /**
     * Dedup token: Stripe's own request.idempotency_key when present (shared across
     * payment_intent.succeeded and charge.succeeded for one confirm call), else the
     * same value as paymentIntentId. Enforced unique via ProcessedPayment.
     */
    @IsString()
    idempotencyKey: string;

    @IsString()
    @IsOptional()
    stripeEventId?: string;

    @IsString()
    @IsOptional()
    stripeEventType?: string;

    @IsString()
    @IsOptional()
    auctionTitle:string

    @IsUUID()
    auctionId: string;

    @IsUUID()
    bidderId: string;

    @IsString()
    bidderName: string;

    /**
     * One payment can cover multiple bid entries (lowest-unique-bid guesses).
     * One Bid row is created per amount, each attributed entryFee of the total.
     */
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    bidAmounts: number[];

    /** Entry fee per bid, i.e. the share of totalPaid attributable to one bid. */
    @IsNumber()
    entryFee: number;

    /** Total amount actually paid for this payment (entryFee * bidAmounts.length). */
    @IsNumber()
    totalPaid: number;

    @IsDateString()
    @IsOptional()
    paidAt: Date;
}
