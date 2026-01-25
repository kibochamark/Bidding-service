# Lowest Unique Bid Auction System

## Overview

This is a **Lowest Unique Bid** auction system where the winner is determined by placing the **LOWEST** bid amount that **NO ONE ELSE** has placed. It's a strategic game where players must predict what bid amounts others won't choose.

## How It Works

### The Rules

1. **Entry Fee**: Each player pays a fixed entry fee (e.g., $2) per bid
2. **Multiple Bids Allowed**: Each player can place MULTIPLE bids per auction (each bid requires payment)
3. **Unique Wins**: Only bids that are unique (no one else placed the same amount) are eligible to win
4. **Lowest Wins**: Among all unique bids, the LOWEST amount wins the prize
5. **Payment Required**: Each bid must be paid for before it's accepted into the auction

### Real Example

**Auction**: PlayStation 5 (worth $500)
**Entry Fee**: $2 per bid
**Deadline**: Sunday at 8 PM

**Bids Placed:**
- Mike: $1
- Sarah: $1
- James: $1
- Daniel: $2
- Emma: $2
- Lisa: $3 ✅
- Tom: $5 ✅
- Chris: $7 ✅
- Amy: $10 ✅
- Kevin: $50 ✅

**Analysis:**
- $1 → 3 people (Mike, Sarah, James) ❌ NOT UNIQUE
- $2 → 2 people (Daniel, Emma) ❌ NOT UNIQUE
- $3 → 1 person (Lisa) ✅ UNIQUE
- $5 → 1 person (Tom) ✅ UNIQUE
- $7 → 1 person (Chris) ✅ UNIQUE
- $10 → 1 person (Amy) ✅ UNIQUE
- $50 → 1 person (Kevin) ✅ UNIQUE

**Winner**: Lisa with $3 (lowest unique bid)

Lisa gets a $500 PlayStation 5 for just $3!

## Database Schema

### Auction Model
```prisma
model Auction {
  id               String        @id @default(uuid())
  productId        String
  title            String
  description      String
  prizeValue       Decimal       @db.Decimal(10, 2)
  entryFee         Decimal       @db.Decimal(10, 2)
  startDate        DateTime      @default(now())
  endDate          DateTime
  status           AuctionStatus @default(ACTIVE)
  winnerId         String?
  winningBidAmount Decimal?      @db.Decimal(10, 2)
  totalBidsCount   Int           @default(0)
  totalRevenue     Decimal       @default(0.0)
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
  product          Product       @relation(fields: [productId], references: [id])
  bids             Bid[]
}
```

### Bid Model
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

  @@index([auctionId, bidAmount])
  @@index([auctionId, isUnique, bidAmount])
  @@index([bidderId])
}
```

### Auction Status
```prisma
enum AuctionStatus {
  ACTIVE              // Auction is accepting bids
  ENDED               // Auction ended but no winner (no unique bids)
  CANCELLED           // Auction was cancelled
  WINNER_DETERMINED   // Winner has been determined
}
```

## Core Logic

### 1. Initiating a Bid with Payment

**Endpoint**: `POST /bids/initiate-payment`

**Request Body**:
```json
{
  "auctionId": "auction-uuid",
  "bidderId": "user-kinde-id",
  "bidderName": "John Doe",
  "bidAmount": 3.50
}
```

**What Happens**:
1. ✅ Verify auction exists and is ACTIVE
2. ✅ Verify auction hasn't ended (with grace period for payment processing)
3. ✅ Calculate total payment (entry fee + any additional fees)
4. ✅ Create payment intent (Stripe/dummy payment)
5. ✅ Return payment details to frontend for payment completion

**Response**:
```json
{
  "paymentIntentId": "pi_dummy_123456",
  "clientSecret": "secret_xyz",
  "amount": 2.00,
  "currency": "usd",
  "auctionId": "auction-uuid",
  "bidAmount": 3.50
}
```

### 2. Confirming Payment and Placing Bid

**Endpoint**: `POST /bids/confirm-payment`

**Request Body**:
```json
{
  "paymentIntentId": "pi_dummy_123456"
}
```

**What Happens**:
1. ✅ Verify payment was successful
2. ✅ Add bid to processing queue (BullMQ)
3. ✅ Return confirmation to user

**Queue Processing** (Asynchronous):
1. ✅ Verify auction is still accepting bids
2. ✅ Check if another bid with the same amount already exists
3. ✅ Create the new bid with `isUnique` flag:
   - `isUnique = true` if no other bid has this amount
   - `isUnique = false` if another bid already has this amount
4. ✅ If another bid exists with same amount, mark it as `isUnique = false`
5. ✅ Update auction stats (totalBidsCount, totalRevenue)
6. ✅ Recalculate which bid is currently winning

**Edge Case Handling**:
- If auction ended during payment processing, bid is accepted but marked with special flag
- User is notified about the timing issue
- Admin can review and decide whether to include the bid

### 2. Recalculating the Winning Bid

**What Happens**:
1. Reset all bids' `isWinning` flag to `false`
2. Find the bid with:
   - `isUnique = true`
   - Lowest `bidAmount`
3. Mark that bid as `isWinning = true`

**Code Location**: [bid.repository.ts:94-125](src/Domains/Bidding/bid.repository.ts#L94-L125)

### 3. Finalizing an Auction

**Endpoint**: `POST /auctions/:id/finalize`

**What Happens**:
1. ✅ Verify auction can be finalized (not already finalized, not cancelled)
2. ✅ Verify end date has passed
3. ✅ Get the current winning bid (where `isWinning = true`)
4. ✅ If no winning bid exists:
   - Set auction status to `ENDED`
   - Return "No winner" message
5. ✅ If winning bid exists:
   - Set auction status to `WINNER_DETERMINED`
   - Return winner information

**Code Location**: [auction.service.ts:62-122](src/Domains/Bidding/auction.service.ts#L62-L122)

## API Endpoints

### Auctions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auctions` | Get all active auctions |
| GET | `/auctions/:id` | Get auction details |
| GET | `/auctions/:id/stats` | Get auction statistics |
| GET | `/auctions/:id/leaderboard` | Get auction leaderboard |
| POST | `/auctions` | Create a new auction |
| POST | `/auctions/:id/finalize` | Finalize auction and determine winner |
| PATCH | `/auctions/:id` | Update auction |
| DELETE | `/auctions/:id` | Delete auction |

### Bids

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bids` | Place a new bid |
| GET | `/bids/auction/:auctionId` | Get all bids for an auction |
| GET | `/bids/bidder/:bidderId` | Get all bids by a bidder |
| GET | `/bids/:id` | Get bid by ID |
| GET | `/bids/auction/:auctionId/winning` | Get current winning bid |
| GET | `/bids/auction/:auctionId/statistics` | Get bid statistics |

## Example Usage Flow

### 1. Create an Auction

```bash
POST /auctions
{
  "productId": "product-uuid",
  "title": "Win a PlayStation 5!",
  "description": "Brand new PS5 worth $500. Entry fee is just $2!",
  "prizeValue": 500.00,
  "entryFee": 2.00,
  "endDate": "2026-01-10T20:00:00Z"
}
```

### 2. Players Place Bids

**Mike's bid:**
```bash
POST /bids
{
  "auctionId": "auction-uuid",
  "bidderId": "mike-kinde-id",
  "bidderName": "Mike",
  "bidAmount": 1.00
}
# Response: { isUnique: true, isWinning: true }
```

**Sarah's bid:**
```bash
POST /bids
{
  "auctionId": "auction-uuid",
  "bidderId": "sarah-kinde-id",
  "bidderName": "Sarah",
  "bidAmount": 1.00
}
# Response: { isUnique: false, isWinning: false }
# Note: Mike's bid is now also isUnique: false
```

**Lisa's bid:**
```bash
POST /bids
{
  "auctionId": "auction-uuid",
  "bidderId": "lisa-kinde-id",
  "bidderName": "Lisa",
  "bidAmount": 3.00
}
# Response: { isUnique: true, isWinning: true }
# Lisa is now winning because $3 is unique and lower than any other unique bid
```

### 3. Check Leaderboard

```bash
GET /auctions/:id/leaderboard

Response:
{
  "auction": {
    "id": "auction-uuid",
    "title": "Win a PlayStation 5!",
    "status": "ACTIVE",
    "endDate": "2026-01-10T20:00:00Z",
    "totalBidsCount": 10
  },
  "currentWinner": {
    "bidderName": "Lisa",
    "bidAmount": 3.00
  },
  "bidStatistics": [
    {
      "bidAmount": 1.00,
      "count": 3,
      "isUnique": false,
      "bidders": ["Mike", "Sarah", "James"]
    },
    {
      "bidAmount": 2.00,
      "count": 2,
      "isUnique": false,
      "bidders": ["Daniel", "Emma"]
    },
    {
      "bidAmount": 3.00,
      "count": 1,
      "isUnique": true,
      "bidders": ["Lisa"]
    },
    {
      "bidAmount": 5.00,
      "count": 1,
      "isUnique": true,
      "bidders": ["Tom"]
    }
  ]
}
```

### 4. Finalize Auction

```bash
POST /auctions/:id/finalize

Response:
{
  "auction": { ... },
  "winner": {
    "bidderId": "lisa-kinde-id",
    "bidderName": "Lisa",
    "winningBidAmount": 3.00
  },
  "message": "Congratulations Lisa! You won with the lowest unique bid of $3"
}
```

## Key Features

### ✅ One Bid Per Auction
- Enforced via unique constraint: `@@unique([auctionId, bidderId])`
- Prevents users from gaming the system with multiple bids

### ✅ Real-Time Uniqueness Tracking
- Every time a bid is placed, we check if it matches existing bids
- If it matches, both bids are marked as `isUnique = false`
- Winning bid is recalculated automatically

### ✅ Automatic Winner Calculation
- The `isWinning` flag is updated after every bid
- Always points to the current lowest unique bid
- Makes finalization instant

### ✅ Bid Statistics
- Shows how many people bid each amount
- Reveals which bids are unique vs duplicated
- Helps players understand the competition

## Strategy Tips (For Your Users)

1. **Don't Be Too Obvious**: $1 seems smart, but everyone thinks that
2. **Avoid Round Numbers**: $5, $10, $20 are popular choices
3. **Think Differently**: Odd amounts like $3.47 might be unique
4. **Study Past Auctions**: Learn common bidding patterns
5. **Don't Overthink**: Sometimes simple strategies work when everyone else is complex

## Next Steps

### Migration
Run the Prisma migration to create the new tables:
```bash
npx prisma migrate dev --name add_auction_and_bid_models
npx prisma generate
```

### Import Module
Add `BiddingModule` to your `app.module.ts`:
```typescript
import { BiddingModule } from './Domains/Bidding/bidding.module';

@Module({
  imports: [
    // ... other modules
    BiddingModule,
  ],
})
export class AppModule {}
```

### Test the System
1. Create an auction
2. Place multiple bids with different amounts
3. Check the leaderboard to see uniqueness tracking
4. Finalize the auction to determine the winner

## Technical Details

### Database Indexes
- `@@index([auctionId, bidAmount])` - Fast bid amount lookups
- `@@index([auctionId, isUnique, bidAmount])` - Fast winner calculation
- `@@index([status, endDate])` - Fast active auction queries

### Performance Considerations
- Winner calculation happens on every bid placement
- Uses indexed queries for fast lookups
- Atomic operations prevent race conditions

### Error Handling
- ❌ Cannot bid on inactive auctions
- ❌ Cannot bid on ended auctions
- ❌ Cannot place multiple bids (enforced by DB constraint)
- ❌ Cannot finalize auction before end date
- ❌ Cannot finalize already finalized auction

## File Structure

```
src/
├── Controllers/Bidding/
│   ├── dto/
│   │   ├── auction.dto.ts       # Auction DTOs
│   │   ├── bid.dto.ts           # Bid DTOs
│   │   └── index.ts
│   ├── auction.controller.ts    # Auction endpoints
│   └── bid.controller.ts        # Bid endpoints
│
├── Domains/Bidding/
│   ├── auction.repository.ts    # Auction data access
│   ├── auction.service.ts       # Auction business logic
│   ├── bid.repository.ts        # Bid data access & uniqueness logic
│   ├── bid.service.ts           # Bid business logic
│   └── bidding.module.ts        # Module definition
│
└── prisma/
    └── schema.prisma            # Database schema
```

---

**Built with NestJS, Prisma, and PostgreSQL**
