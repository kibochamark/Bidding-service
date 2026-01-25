# Payment and Bidding Flow Architecture

## Overview
This document explains how payments and bidding work together using Stripe for payments and BullMQ for asynchronous processing.

## System Components

### 1. Frontend (React/Next.js)
- Stripe Elements for payment UI
- Handles payment intent creation
- Displays bidding interface

### 2. Backend (NestJS)
- Stripe webhook handler
- BullMQ queue management
- Bid processing and validation
- Winner calculation

### 3. External Services
- **Stripe**: Payment processing
- **Redis**: Queue management for BullMQ
- **PostgreSQL**: Data persistence

---

## Complete Bidding Flow

### Step 1: User Initiates Bid (Frontend)

**User Action:**
```
User views auction → Enters bid amount → Clicks "Place Bid"
```

**What Happens:**
1. Frontend validates:
   - User is logged in
   - User is KYC verified
   - Auction is still active (not ended)
   - Bid amount is valid (e.g., between min/max range)

2. Frontend calculates total payment:
   ```javascript
   totalPayment = entryFee + bidAmount

   Example:
   entryFee = $5.00
   bidAmount = $50.00
   totalPayment = $55.00
   ```

### Step 2: Create Stripe Payment Intent (Frontend → Stripe)

**Frontend Request:**
```javascript
// Frontend creates payment intent via Stripe API
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5500, // $55.00 in cents
  currency: 'usd',
  metadata: {
    auctionId: 'auction-uuid-123',
    bidderId: 'user-uuid-456',
    bidderName: 'John Doe',
    bidAmount: '50.00',
    entryFee: '5.00',
    type: 'auction_bid'
  }
});
```

**Important Metadata Fields:**
- `auctionId`: Which auction this bid is for
- `bidderId`: User's account ID (from your system)
- `bidderName`: User's display name
- `bidAmount`: The actual bid amount (not including entry fee)
- `entryFee`: The auction's entry fee
- `type`: Identifier to distinguish bid payments from other payments

### Step 3: User Completes Payment (Frontend)

**Payment Flow:**
1. User enters card details in Stripe Elements
2. Frontend confirms payment:
   ```javascript
   const { error, paymentIntent } = await stripe.confirmCardPayment(
     clientSecret,
     { payment_method: paymentMethodId }
   );
   ```
3. Stripe processes payment
4. Payment succeeds or fails

**Success Response:**
```javascript
{
  paymentIntent: {
    id: 'pi_1234567890',
    status: 'succeeded',
    amount: 5500,
    metadata: { /* your metadata */ }
  }
}
```

### Step 4: Stripe Sends Webhook (Stripe → Backend)

**When Payment Succeeds:**
Stripe automatically sends a webhook event to your backend:

```
POST https://your-api.com/webhooks/stripe
```

**Webhook Event:**
```json
{
  "id": "evt_1234567890",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 5500,
      "status": "succeeded",
      "metadata": {
        "auctionId": "auction-uuid-123",
        "bidderId": "user-uuid-456",
        "bidderName": "John Doe",
        "bidAmount": "50.00",
        "entryFee": "5.00",
        "type": "auction_bid"
      }
    }
  }
}
```

### Step 5: Webhook Handler Validates and Queues (Backend)

**Backend Webhook Handler:**
```typescript
@Post('webhooks/stripe')
async handleStripeWebhook(@Body() event: StripeWebhookEvent) {

  // 1. Verify webhook signature (security)
  const signature = req.headers['stripe-signature'];
  stripe.webhooks.constructEvent(payload, signature, webhookSecret);

  // 2. Check event type
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // 3. Validate metadata
    if (paymentIntent.metadata.type === 'auction_bid') {

      // 4. Add job to BullMQ queue
      await bidQueue.add('process-bid', {
        paymentIntentId: paymentIntent.id,
        auctionId: paymentIntent.metadata.auctionId,
        bidderId: paymentIntent.metadata.bidderId,
        bidderName: paymentIntent.metadata.bidderName,
        bidAmount: paymentIntent.metadata.bidAmount,
        entryFee: paymentIntent.metadata.entryFee,
        totalPaid: paymentIntent.amount / 100, // Convert cents to dollars
        paidAt: new Date()
      });

      // 5. Return 200 OK immediately (don't make Stripe wait)
      return { received: true };
    }
  }
}
```

**Why Use a Queue?**
- Webhook must respond quickly (< 5 seconds)
- Bid processing might be slow (DB queries, validations, calculations)
- Prevents webhook timeouts
- Handles retries if processing fails
- Processes bids in order

### Step 6: BullMQ Processes Bid (Background Worker)

**Worker Picks Up Job:**
```typescript
@Processor('bid-queue')
export class BidProcessor {

  @Process('process-bid')
  async processBid(job: Job) {
    const data = job.data;

    // 1. Validate auction still active
    const auction = await this.auctionRepo.findById(data.auctionId);
    if (auction.status !== 'ACTIVE') {
      throw new Error('Auction is no longer active');
    }
    if (new Date() > auction.endDate) {
      throw new Error('Auction has ended');
    }

    // 2. Verify user is KYC verified
    const account = await this.accountRepo.findByKindeId(data.bidderId);
    if (!account.kyc || account.kyc.status !== 'VERIFIED') {
      throw new Error('User is not KYC verified');
    }

    // 3. Create bid in database
    const bid = await this.bidRepo.create({
      auctionId: data.auctionId,
      bidderId: data.bidderId,
      bidderName: data.bidderName,
      bidAmount: data.bidAmount,
      paymentIntentId: data.paymentIntentId,
      paymentStatus: 'PAID',
      entryFeePaid: data.entryFee,
      totalPaid: data.totalPaid,
      placedAt: data.paidAt
    });

    // 4. Check if bid amount already exists (uniqueness check)
    const existingBidsWithAmount = await this.bidRepo.findByAmount(
      data.auctionId,
      data.bidAmount
    );

    if (existingBidsWithAmount.length > 1) {
      // This bid amount is NOT unique anymore
      await this.bidRepo.markAsNotUnique(existingBidsWithAmount);
    }

    // 5. Update auction stats
    await this.auctionRepo.incrementBidCount(data.auctionId);
    await this.auctionRepo.addRevenue(data.auctionId, data.totalPaid);

    // 6. Recalculate winner
    await this.bidRepo.recalculateWinner(data.auctionId);

    return { success: true, bidId: bid.id };
  }
}
```

### Step 7: Recalculate Winner (Background)

**Winner Calculation Logic:**
```typescript
async recalculateWinner(auctionId: string) {

  // 1. Reset all bids to not winning
  await this.prisma.bid.updateMany({
    where: { auctionId },
    data: { isWinning: false }
  });

  // 2. Find the LOWEST bid that is UNIQUE
  const lowestUniqueBid = await this.prisma.bid.findFirst({
    where: {
      auctionId,
      isUnique: true  // Only consider unique bids
    },
    orderBy: {
      bidAmount: 'asc'  // Lowest first
    }
  });

  // 3. Mark this bid as winning
  if (lowestUniqueBid) {
    await this.prisma.bid.update({
      where: { id: lowestUniqueBid.id },
      data: { isWinning: true }
    });

    // 4. Update auction with winner info
    await this.prisma.auction.update({
      where: { id: auctionId },
      data: {
        winnerId: lowestUniqueBid.bidderId,
        winningBidAmount: lowestUniqueBid.bidAmount
      }
    });
  }

  return lowestUniqueBid;
}
```

---

## Multiple Bids Per User

**Scenario:**
John wants to place 3 different bids on the same auction.

**Flow:**

**Bid 1: $50**
```
Payment: $5 (entry) + $50 (bid) = $55
Status: Unique ✅ | Winning ✅ (lowest unique)
```

**Bid 2: $75**
```
Payment: $5 (entry) + $75 (bid) = $80
Status: Unique ✅ | Winning ❌ (not lowest)
Winner is still: $50
```

**Bid 3: $40**
```
Payment: $5 (entry) + $40 (bid) = $45
Status: Unique ✅ | Winning ✅ (NEW lowest unique)
Winner is now: $40 (replacing $50)
```

**Another user bids $40:**
```
Payment: $5 (entry) + $40 (bid) = $45
Status: Unique ❌ (duplicate amount)

John's $40 bid → Status changes to: Unique ❌ | Winning ❌
Winner is now: $50 (John's first bid becomes winner again!)
```

---

## Database Schema Updates Needed

### Current Bid Model
```prisma
model Bid {
  id          String   @id @default(uuid())
  auctionId   String
  bidderId    String
  bidderName  String
  bidAmount   Decimal  @db.Decimal(10, 2)
  isUnique    Boolean  @default(true)
  isWinning   Boolean  @default(false)
  placedAt    DateTime @default(now())
  auction     Auction  @relation(fields: [auctionId], references: [id])

  @@unique([auctionId, bidderId]) // ❌ REMOVE THIS
}
```

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

  @@index([auctionId, bidAmount])           // Fast lookup by amount
  @@index([auctionId, isUnique, bidAmount]) // Winner calculation
  @@index([bidderId])                       // User's bid history
}

enum PaymentStatus {
  PENDING
  PAID
  REFUNDED
  FAILED
}
```

---

## Security & Validation

### 1. Webhook Security
```typescript
// Verify webhook came from Stripe
const signature = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  request.body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

### 2. Idempotency
```typescript
// Prevent duplicate processing if webhook is retried
const existingBid = await this.bidRepo.findByPaymentIntent(paymentIntentId);
if (existingBid) {
  return { already_processed: true };
}
```

### 3. KYC Verification
```typescript
// Only verified users can bid
if (account.kyc?.status !== KycStatus.VERIFIED) {
  throw new ForbiddenException('KYC verification required to bid');
}
```

### 4. Auction Status
```typescript
// Only allow bids on active auctions
if (auction.status !== AuctionStatus.ACTIVE) {
  throw new BadRequestException('Auction is not active');
}

if (new Date() > auction.endDate) {
  throw new BadRequestException('Auction has ended');
}
```

---

## Error Handling

### Payment Fails
```
User sees error on frontend → No bid is created
No webhook is sent → No queue job created
```

### Webhook Processing Fails
```
BullMQ retries the job (configurable: 3-5 attempts)
If all retries fail → Job moves to failed queue
Admin can manually review failed jobs
User should be notified to contact support
Consider refunding the payment
```

### Duplicate Webhook
```
Webhook arrives twice (Stripe retries)
Check if paymentIntentId already exists in database
If yes → Return success without creating duplicate bid
```

---

## Benefits of This Architecture

### 1. **Fast Response Times**
- Webhook responds in milliseconds
- Heavy processing happens in background

### 2. **Reliability**
- BullMQ handles retries automatically
- Jobs are persisted in Redis (survive crashes)
- Failed jobs can be replayed

### 3. **Scalability**
- Multiple workers can process jobs in parallel
- Queue handles high load gracefully

### 4. **Payment Security**
- Stripe handles PCI compliance
- No card data touches your server
- Webhook signature verification

### 5. **Audit Trail**
- Every bid linked to payment intent
- Can trace payment → webhook → queue job → bid
- Refunds can be matched to specific bids

---

## Frontend Integration Example

### React Component
```typescript
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function PlaceBidForm({ auction }) {
  const stripe = useStripe();
  const elements = useElements();
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auctionId: auction.id,
        bidAmount: parseFloat(bidAmount),
        entryFee: auction.entryFee
      })
    });

    const { clientSecret } = await response.json();

    // 2. Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: user.fullName }
        }
      }
    );

    if (error) {
      alert('Payment failed: ' + error.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      alert('Bid placed successfully!');
      // Redirect or update UI
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter bid amount"
      />
      <CardElement />
      <button type="submit">
        Pay ${(parseFloat(bidAmount) + auction.entryFee).toFixed(2)} and Place Bid
      </button>
    </form>
  );
}
```

---

## Summary

**Payment Flow:**
```
User → Stripe Payment → Webhook → BullMQ Queue → Process Bid → Update Winner
```

**Key Points:**
- ✅ User must pay BEFORE bid is created
- ✅ Payment includes entry fee + bid amount
- ✅ Webhook triggers asynchronous processing
- ✅ BullMQ ensures reliable processing
- ✅ Users can place unlimited bids (if verified)
- ✅ Winner = Lowest Unique Bid
- ✅ Winner recalculated after every bid

**Next Steps:**
1. Install dependencies: `bullmq`, `ioredis`, `stripe`
2. Update Prisma schema
3. Create webhook controller
4. Create BullMQ queue service
5. Create BullMQ processor
6. Update bid repository
7. Test end-to-end flow
