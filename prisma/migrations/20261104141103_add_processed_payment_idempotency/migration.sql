-- Adds ProcessedPayment: one row per canonical Stripe payment that has been turned
-- into Bid rows. The unique index on "idempotencyKey" is the durable exactly-once
-- guarantee for the /bids/stripe/webhook pipeline: Stripe sends several events per
-- payment (payment_intent.succeeded + charge.succeeded, and redeliveries), and
-- BullMQ jobId dedup alone cannot cover all of them. See BidRepository.placeBidsWithPayment.

-- CreateTable
CREATE TABLE "ProcessedPayment" (
    "id" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "bidCount" INTEGER NOT NULL,
    "totalPaid" DECIMAL(10,2) NOT NULL,
    "sourceEventId" TEXT,
    "sourceEventType" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedPayment_idempotencyKey_key" ON "ProcessedPayment"("idempotencyKey");

-- CreateIndex
CREATE INDEX "ProcessedPayment_paymentIntentId_idx" ON "ProcessedPayment"("paymentIntentId");

-- CreateIndex
CREATE INDEX "ProcessedPayment_auctionId_idx" ON "ProcessedPayment"("auctionId");

-- CreateIndex
CREATE INDEX "ProcessedPayment_bidderId_idx" ON "ProcessedPayment"("bidderId");

-- CreateIndex
CREATE INDEX "Bid_paymentIntentId_idx" ON "Bid"("paymentIntentId");
