# Payment-Based Bidding Flow

## Overview

This document explains the payment-based bidding system where users can place **multiple bids** on the same auction, with each bid requiring payment of an entry fee.

## Key Changes from Original System

### Before
- Users could only place **ONE bid per auction**
- No payment processing required
- Bids were immediately accepted

### After
- Users can place **UNLIMITED bids per auction**
- Each bid requires payment of the entry fee
- Bids are queued and processed asynchronously
- Payment is processed **BEFORE** the bid is accepted

## Payment Flow

### Step 1: Initiate Payment

**Endpoint**: `POST /bids/initiate-payment`

**Request**:
```json
{
  "auctionId": "auction-uuid",
  "bidderId": "user-kinde-id",
  "bidderName": "John Doe",
  "bidAmount": 3.50
}
```

**What Happens**:
1. Validates auction exists and is ACTIVE
2. Checks if auction has ended
3. Warns user if auction ends in less than 5 minutes
4. Calculates total payment (entry fee)
5. Creates payment intent (currently dummy data, will use Stripe in production)
6. Returns payment details to frontend

**Response**:
```json
{
  "paymentIntentId": "pi_dummy_1234567890",
  "clientSecret": "secret_xyz",
  "amount": 2.00,
  "currency": "usd",
  "auctionId": "auction-uuid",
  "bidAmount": 3.50,
  "entryFee": 2.00,
  "totalAmount": 2.00,
  "warning": "Warning: Auction ends in 3 minutes. Complete payment quickly!",
  "auctionEndTime": "2026-01-15T12:00:00Z"
}
```

### Step 2: User Completes Payment

The frontend uses the `clientSecret` to complete payment with Stripe (or dummy payment UI for testing).

### Step 3: Confirm Payment

**Endpoint**: `POST /bids/confirm-payment`

**Request**:
```json
{
  "paymentIntentId": "pi_dummy_1234567890"
}
```

**What Happens**:
1. Verifies payment intent exists
2. Confirms payment was successful (currently auto-approved, will verify with Stripe)
3. Queues bid for processing using BullMQ
4. Returns confirmation to user

**Response**:
```json
{
  "success": true,
  "message": "Payment confirmed. Your bid is being processed.",
  "paymentIntentId": "pi_dummy_1234567890"
}
```

### Step 4: Async Bid Processing (BullMQ Queue)

The bid is processed asynchronously by the `BidProcessor`:

1. **Validates auction status** - Checks if auction is still ACTIVE
2. **Checks for grace period** - Allows 2-minute grace period after auction end
3. **Checks bid uniqueness** - Determines if bid amount is unique
4. **Creates bid record** - Saves bid to database with payment information
5. **Updates other bids** - Marks matching bid amounts as non-unique
6. **Updates auction stats** - Increments bid count and revenue
7. **Recalculates winner** - Determines new winning bid (lowest unique)

## Edge Case: Auction Ending During Payment

### The Problem

**Scenario**: User initiates payment at 11:58 AM, auction ends at 12:00 PM, payment confirmation received at 12:01 PM.

**Question**: Should we accept this bid?

### The Solution: Grace Period

We implement a **2-minute grace period** after the auction end time to handle payment processing delays.

**Timeline**:
```
11:58 AM - User initiates payment (auction active)
12:00 PM - Auction officially ends
12:01 PM - Payment confirmed (within 2-minute grace period)
✅ Bid is ACCEPTED with warning flag
```

### Implementation Details

#### In `bid.repository.ts`:

```typescript
// Check if auction has ended - allow a 2-minute grace period for payment processing
const gracePeriodMs = 2 * 60 * 1000; // 2 minutes
const auctionEndWithGrace = new Date(auction.endDate.getTime() + gracePeriodMs);
const now = new Date();
const isAfterAuctionEnd = now > auction.endDate;
const isWithinGracePeriod = now <= auctionEndWithGrace;

if (now > auctionEndWithGrace) {
    throw new BadRequestException('Auction has ended and grace period expired. Bid cannot be placed.');
}
```

**Bid Result**:
```typescript
{
    ...bidData,
    processedAfterAuctionEnd: true,   // Bid was placed after official end
    withinGracePeriod: true,          // But within grace period
}
```

### Grace Period Rules

| Time | Auction Status | Payment Initiated | Payment Confirmed | Result |
|------|----------------|-------------------|-------------------|--------|
| 11:55 | Active | ✅ Allowed | ✅ Accepted | Bid accepted normally |
| 11:59 | Active | ✅ Allowed | ✅ Accepted | Bid accepted normally |
| 12:00 | Ended | ❌ Not allowed | N/A | Cannot initiate payment |
| 11:59 | Active | ✅ Allowed | 12:01 ✅ Accepted | Bid accepted with warning |
| 11:59 | Active | ✅ Allowed | 12:03 ❌ Rejected | Grace period expired |

### Warning System

When a bid is processed after auction end but within grace period:

```typescript
if (result.processedAfterAuctionEnd && result.withinGracePeriod) {
    this.logger.warn(
        `Bid ${result.id} was placed after auction end but within grace period. ` +
        `Auction: ${bidData.auctionId}, Bidder: ${bidData.bidderName}`
    );
}
```

**Admin Review**: These bids are flagged in logs for admin review if needed.

## Database Schema

### Updated Bid Model

```prisma
model Bid {
  id               String        @id @default(uuid())
  auctionId        String
  bidderId         String
  bidderName       String
  bidAmount        Decimal       @db.Decimal(10, 2)
  entryFeePaid     Decimal       @db.Decimal(10, 2)
  totalPaid        Decimal       @db.Decimal(10, 2)
  paymentIntentId  String        @unique  // Stripe payment intent ID
  paymentStatus    PaymentStatus @default(PAID)
  isUnique         Boolean       @default(true)
  isWinning        Boolean       @default(false)
  placedAt         DateTime      @default(now())
  auction          Auction       @relation(fields: [auctionId], references: [id])

  @@index([auctionId, bidAmount])
  @@index([auctionId, isUnique, bidAmount])
  @@index([bidderId])
}

enum PaymentStatus {
  PENDING
  PAID
  REFUNDED
  FAILED
}
```

**Key Changes**:
- Removed `@@unique([auctionId, bidderId])` constraint (allows multiple bids per user)
- Added payment tracking fields: `entryFeePaid`, `totalPaid`, `paymentIntentId`, `paymentStatus`

## API Endpoints

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bids/initiate-payment` | Start the payment process for a new bid |
| POST | `/bids/confirm-payment` | Confirm payment and queue bid for processing |

### Legacy Endpoints (still available)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bids` | Place a bid without payment (testing only) |
| GET | `/bids/auction/:auctionId` | Get all bids for an auction |
| GET | `/bids/bidder/:bidderId` | Get all bids by a bidder |
| GET | `/bids/:id` | Get bid by ID |
| GET | `/bids/auction/:auctionId/winning` | Get current winning bid |
| GET | `/bids/auction/:auctionId/statistics` | Get bid statistics |

## Queue Processing with BullMQ

### Why Queue Processing?

1. **Decouples payment from bid placement** - Payment can be confirmed immediately, bid processed later
2. **Handles spikes in traffic** - Queue can handle many simultaneous bids
3. **Retry mechanism** - Failed bids can be retried automatically (3 attempts)
4. **Audit trail** - All bid processing is logged
5. **Prevents race conditions** - Bids are processed sequentially

### Queue Configuration

```typescript
BullModule.forRoot({
  connection: {
    host: 'localhost',
    port: 6379,
  },
  defaultJobOptions: {
    attempts: 3,           // Retry up to 3 times on failure
    removeOnComplete: 1000, // Keep 1000 completed jobs
    removeOnFail: 2000     // Keep 2000 failed jobs
  }
})
```

### Job Processing

**Job Data**:
```typescript
{
  paymentIntentId: "pi_dummy_1234567890",
  auctionId: "auction-uuid",
  bidderId: "user-kinde-id",
  bidderName: "John Doe",
  bidAmount: 3.50,
  entryFee: 2.00,
  totalPaid: 2.00,
  paidAt: "2026-01-13T11:59:00Z"
}
```

**Processing Steps**:
1. Validate auction is still accepting bids (or within grace period)
2. Check bid amount uniqueness
3. Create bid record with payment data
4. Update auction statistics
5. Recalculate winning bid
6. Return success/failure

## Testing the System

### 1. Start Redis
```bash
docker run -d -p 6379:6379 redis:alpine
```

### 2. Test Normal Bid Flow

```bash
# Step 1: Initiate payment
curl -X POST http://localhost:3000/bids/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "auctionId": "auction-123",
    "bidderId": "user-456",
    "bidderName": "John Doe",
    "bidAmount": 5.00
  }'

# Response: { "paymentIntentId": "pi_dummy_...", ... }

# Step 2: Confirm payment
curl -X POST http://localhost:3000/bids/confirm-payment \
  -H "Content-Type: application/json" \
  -d '{
    "paymentIntentId": "pi_dummy_..."
  }'

# Response: { "success": true, "message": "Payment confirmed..." }
```

### 3. Test Multiple Bids from Same User

```bash
# Place first bid
curl -X POST http://localhost:3000/bids/initiate-payment \
  -d '{ "auctionId": "auction-123", "bidderId": "user-456", "bidderName": "John", "bidAmount": 3.00 }'

# Place second bid (different amount, same user)
curl -X POST http://localhost:3000/bids/initiate-payment \
  -d '{ "auctionId": "auction-123", "bidderId": "user-456", "bidderName": "John", "bidAmount": 7.00 }'

# Both bids should be accepted ✅
```

### 4. Test Edge Case: Auction Ending Soon

```bash
# Create an auction that ends in 3 minutes
# Then initiate payment - should receive warning
curl -X POST http://localhost:3000/bids/initiate-payment \
  -d '{ "auctionId": "ending-soon-auction", ... }'

# Response should include:
# "warning": "Warning: Auction ends in 3 minutes. Complete payment quickly!"
```

## Security Considerations

### Current Implementation (Dummy Payments)

- Payment intents stored in memory (Map)
- Auto-approved payments
- No actual Stripe integration

### Production Implementation (TODO)

1. **Replace dummy payment intents with Stripe**:
   ```typescript
   const paymentIntent = await stripe.paymentIntents.create({
     amount: totalAmount * 100,
     currency: 'usd',
     metadata: {
       auctionId: data.auctionId,
       bidderId: data.bidderId,
       bidAmount: data.bidAmount.toString(),
     },
   });
   ```

2. **Verify payments before queuing**:
   ```typescript
   const paymentIntent = await stripe.paymentIntents.retrieve(
     data.paymentIntentId
   );

   if (paymentIntent.status !== 'succeeded') {
     throw new BadRequestException('Payment not successful');
   }
   ```

3. **Use Redis for payment intent storage** (instead of in-memory Map)

4. **Add webhook for payment confirmations**

5. **Implement refund logic** for canceled auctions

## Architecture Diagram

```
┌─────────────┐
│   Client    │
│  (Frontend) │
└──────┬──────┘
       │
       │ 1. POST /bids/initiate-payment
       ▼
┌─────────────────────┐
│  BidController      │
│  (bid.controller.ts)│
└──────┬──────────────┘
       │
       │ 2. Call initiateBidPayment()
       ▼
┌─────────────────────┐          ┌──────────────────┐
│   BidService        │◄─────────│ AuctionRepository│
│  (bid.service.ts)   │          └──────────────────┘
└──────┬──────────────┘
       │
       │ 3. Create payment intent
       │ 4. Store in memory/Redis
       │
       │ 5. Return payment details
       ▼
┌─────────────┐
│   Client    │ ─────► User completes payment
│  (Frontend) │
└──────┬──────┘
       │
       │ 6. POST /bids/confirm-payment
       ▼
┌─────────────────────┐
│  BidController      │
└──────┬──────────────┘
       │
       │ 7. Call confirmBidPayment()
       ▼
┌─────────────────────┐
│   BidService        │
│ - Verify payment    │
│ - Mark confirmed    │
└──────┬──────────────┘
       │
       │ 8. Queue bid job
       ▼
┌─────────────────────┐          ┌──────────────────┐
│   QueueService      │─────────►│   Redis Queue    │
│ (queue.service.ts)  │          │    (BullMQ)      │
└─────────────────────┘          └────────┬─────────┘
                                         │
                                         │ 9. Process job
                                         ▼
                                  ┌──────────────────┐
                                  │  BidProcessor    │
                                  │ (bid.processor.ts│
                                  └────────┬─────────┘
                                          │
                                          │ 10. Place bid
                                          ▼
                                  ┌──────────────────┐
                                  │  BidRepository   │
                                  │ - Create bid     │
                                  │ - Check unique   │
                                  │ - Update stats   │
                                  │ - Calc winner    │
                                  └────────┬─────────┘
                                          │
                                          ▼
                                  ┌──────────────────┐
                                  │   PostgreSQL     │
                                  │   (Prisma)       │
                                  └──────────────────┘
```

## Summary

✅ **Multiple bids per user allowed** - Pay entry fee for each bid
✅ **Payment required before bid acceptance** - No free bids
✅ **Async processing** - Bids queued and processed via BullMQ
✅ **Grace period handling** - 2-minute window after auction end
✅ **Warning system** - Alerts users when auction ending soon
✅ **Easy to understand** - Clear separation of concerns
✅ **Production-ready architecture** - Just needs Stripe integration

The edge case of users joining right before auction end is handled gracefully with:
1. Warnings during payment initiation
2. Grace period for payment processing
3. Logging for admin review
4. Clear status flags on bids
