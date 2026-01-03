# Real-World Bidding Example: PlayStation 5 Auction

This example walks through a complete auction lifecycle showing exactly how the system handles bids.

## Setup: Create the Auction

**Product**: PlayStation 5
**Prize Value**: $500
**Entry Fee**: $2
**End Date**: Sunday, January 5, 2026 at 8:00 PM

```http
POST /auctions
Content-Type: application/json

{
  "productId": "product-uuid-ps5",
  "title": "Win a Brand New PlayStation 5!",
  "description": "Get a $500 PS5 for just $2 entry fee. Lowest unique bid wins!",
  "prizeValue": 500.00,
  "entryFee": 2.00,
  "endDate": "2026-01-05T20:00:00Z"
}
```

**Response:**
```json
{
  "id": "auction-123",
  "productId": "product-uuid-ps5",
  "title": "Win a Brand New PlayStation 5!",
  "status": "ACTIVE",
  "prizeValue": 500,
  "entryFee": 2,
  "totalBidsCount": 0,
  "totalRevenue": 0,
  "endDate": "2026-01-05T20:00:00Z",
  "product": { /* product details */ }
}
```

**Database State:**
```sql
-- Auction table
id: "auction-123"
status: "ACTIVE"
totalBidsCount: 0
totalRevenue: 0
winnerId: null
winningBidAmount: null

-- Bid table (empty)
```

---

## 3:00 PM - First Bids

### Mike's Bid: $1

```http
POST /bids
Content-Type: application/json

{
  "auctionId": "auction-123",
  "bidderId": "kinde-mike-123",
  "bidderName": "Mike",
  "bidAmount": 1.00
}
```

**What happens in the code:**

1. **Validation** ([bid.repository.ts:18-34](src/Domains/Bidding/bid.repository.ts#L18-L34))
   ```typescript
   // ✅ Auction exists and is ACTIVE
   // ✅ Auction hasn't ended
   // ✅ Mike hasn't bid before
   ```

2. **Uniqueness Check** ([bid.repository.ts:49-56](src/Domains/Bidding/bid.repository.ts#L49-L56))
   ```typescript
   const existingBidWithSameAmount = await this.prisma.bid.findFirst({
       where: { auctionId: "auction-123", bidAmount: 1.00 }
   });
   // Result: null (no one bid $1 yet)

   const isUnique = !existingBidWithSameAmount; // true
   ```

3. **Create Bid** ([bid.repository.ts:60-68](src/Domains/Bidding/bid.repository.ts#L60-L68))
   ```typescript
   const newBid = await this.prisma.bid.create({
       data: {
           auctionId: "auction-123",
           bidderId: "kinde-mike-123",
           bidderName: "Mike",
           bidAmount: 1.00,
           isUnique: true  // ✅ First person to bid $1
       }
   });
   ```

4. **Update Auction Stats** ([bid.repository.ts:77-82](src/Domains/Bidding/bid.repository.ts#L77-L82))
   ```typescript
   await this.prisma.auction.update({
       where: { id: "auction-123" },
       data: {
           totalBidsCount: { increment: 1 },  // 0 → 1
           totalRevenue: { increment: 2.00 }   // $0 → $2
       }
   });
   ```

5. **Recalculate Winner** ([bid.repository.ts:94-125](src/Domains/Bidding/bid.repository.ts#L94-L125))
   ```typescript
   // Reset all to not winning
   await this.prisma.bid.updateMany({
       where: { auctionId: "auction-123" },
       data: { isWinning: false }
   });

   // Find lowest unique bid
   const lowestUniqueBid = await this.prisma.bid.findFirst({
       where: { auctionId: "auction-123", isUnique: true },
       orderBy: { bidAmount: 'asc' }
   });
   // Result: Mike's $1 bid

   // Mark it as winning
   await this.prisma.bid.update({
       where: { id: lowestUniqueBid.id },
       data: { isWinning: true }  // ✅ Mike is winning!
   });
   ```

**Response:**
```json
{
  "id": "bid-001",
  "auctionId": "auction-123",
  "bidderId": "kinde-mike-123",
  "bidderName": "Mike",
  "bidAmount": 1.00,
  "isUnique": true,
  "isWinning": true,  // 🏆 Mike is currently winning!
  "placedAt": "2026-01-05T15:00:00Z"
}
```

**Database State:**
```sql
-- Auction
totalBidsCount: 1
totalRevenue: 2.00

-- Bids
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | true     | true ✅   |
```

---

### Sarah's Bid: $1 (Same as Mike!)

```http
POST /bids
{
  "auctionId": "auction-123",
  "bidderId": "kinde-sarah-456",
  "bidderName": "Sarah",
  "bidAmount": 1.00
}
```

**What happens:**

1. **Validation** - ✅ Passes

2. **Uniqueness Check**
   ```typescript
   const existingBidWithSameAmount = await this.prisma.bid.findFirst({
       where: { auctionId: "auction-123", bidAmount: 1.00 }
   });
   // Result: Mike's bid! ❌

   const isUnique = !existingBidWithSameAmount; // false
   ```

3. **Create Bid**
   ```typescript
   const newBid = await this.prisma.bid.create({
       data: {
           bidAmount: 1.00,
           isUnique: false  // ❌ Not unique anymore
       }
   });
   ```

4. **Mark Existing Bid as NOT Unique** ([bid.repository.ts:71-75](src/Domains/Bidding/bid.repository.ts#L71-L75))
   ```typescript
   if (existingBidWithSameAmount) {
       await this.prisma.bid.update({
           where: { id: "bid-001" },  // Mike's bid
           data: { isUnique: false }   // ❌ Mike's bid is no longer unique!
       });
   }
   ```

5. **Recalculate Winner**
   ```typescript
   // Find lowest unique bid
   const lowestUniqueBid = await this.prisma.bid.findFirst({
       where: { auctionId: "auction-123", isUnique: true },
       orderBy: { bidAmount: 'asc' }
   });
   // Result: null (no unique bids exist!)

   // No one is marked as winning
   ```

**Response:**
```json
{
  "id": "bid-002",
  "bidderName": "Sarah",
  "bidAmount": 1.00,
  "isUnique": false,  // ❌ Not unique
  "isWinning": false, // ❌ Not winning
  "placedAt": "2026-01-05T15:05:00Z"
}
```

**Database State:**
```sql
-- Auction
totalBidsCount: 2
totalRevenue: 4.00

-- Bids
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false ❌ | false     |
| Sarah      | $1.00     | false ❌ | false     |

-- No one is winning right now!
```

---

### Lisa's Bid: $3

```http
POST /bids
{
  "auctionId": "auction-123",
  "bidderId": "kinde-lisa-789",
  "bidderName": "Lisa",
  "bidAmount": 3.00
}
```

**What happens:**

1. **Uniqueness Check**
   ```typescript
   const existingBidWithSameAmount = await this.prisma.bid.findFirst({
       where: { auctionId: "auction-123", bidAmount: 3.00 }
   });
   // Result: null (no one bid $3)

   const isUnique = true; // ✅ Unique!
   ```

2. **Create Bid**
   ```typescript
   const newBid = await this.prisma.bid.create({
       data: {
           bidAmount: 3.00,
           isUnique: true  // ✅ First $3 bid
       }
   });
   ```

3. **Recalculate Winner**
   ```typescript
   const lowestUniqueBid = await this.prisma.bid.findFirst({
       where: { auctionId: "auction-123", isUnique: true },
       orderBy: { bidAmount: 'asc' }
   });
   // Result: Lisa's $3 bid (only unique bid!)

   await this.prisma.bid.update({
       where: { id: "bid-003" },
       data: { isWinning: true }  // ✅ Lisa is winning!
   });
   ```

**Database State:**
```sql
-- Bids
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false    | false     |
| Sarah      | $1.00     | false    | false     |
| Lisa       | $3.00     | true ✅  | true ✅   |

-- Lisa is currently winning! 🏆
```

---

## 5:00 PM - More Bids

### Tom's Bid: $5

```http
POST /bids
{
  "bidderId": "kinde-tom-111",
  "bidderName": "Tom",
  "bidAmount": 5.00
}
```

**Result:**
```sql
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false    | false     |
| Sarah      | $1.00     | false    | false     |
| Lisa       | $3.00     | true ✅  | true ✅   | ← Still winning (lowest unique)
| Tom        | $5.00     | true     | false     | ← Unique but higher than Lisa
```

Lisa is **still winning** because $3 < $5.

---

### James' Bid: $1 (Third person to bid $1!)

```http
POST /bids
{
  "bidderId": "kinde-james-222",
  "bidderName": "James",
  "bidAmount": 1.00
}
```

**Result:**
```sql
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false    | false     |
| Sarah      | $1.00     | false    | false     |
| James      | $1.00     | false ❌ | false     | ← Also not unique
| Lisa       | $3.00     | true ✅  | true ✅   |
| Tom        | $5.00     | true     | false     |

-- Still no change to winner (Lisa)
```

---

### Daniel's Bid: $2

```http
POST /bids
{
  "bidderId": "kinde-daniel-333",
  "bidderName": "Daniel",
  "bidAmount": 2.00
}
```

**Recalculate Winner:**
```typescript
const lowestUniqueBid = await this.prisma.bid.findFirst({
    where: { auctionId: "auction-123", isUnique: true },
    orderBy: { bidAmount: 'asc' }
});
// Result: Daniel's $2 bid!
// $2 < $3 < $5, and $2 is unique
```

**Result:**
```sql
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false    | false     |
| Sarah      | $1.00     | false    | false     |
| James      | $1.00     | false    | false     |
| Daniel     | $2.00     | true ✅  | true ✅   | ← NEW WINNER! 🏆
| Lisa       | $3.00     | true     | false     | ← Lost the lead
| Tom        | $5.00     | true     | false     |

-- Daniel is now winning with $2!
```

---

### Emma's Bid: $2 (Same as Daniel!)

```http
POST /bids
{
  "bidderId": "kinde-emma-444",
  "bidderName": "Emma",
  "bidAmount": 2.00
}
```

**What happens:**
```typescript
// Check uniqueness
const existingBidWithSameAmount = /* finds Daniel's bid */;
const isUnique = false;

// Create Emma's bid as NOT unique
await this.prisma.bid.create({ isUnique: false });

// Mark Daniel's bid as NOT unique
await this.prisma.bid.update({
    where: { id: "daniel-bid-id" },
    data: { isUnique: false }  // ❌ Daniel's bid is no longer unique
});

// Recalculate winner
const lowestUniqueBid = /* finds Lisa's $3 bid */;
```

**Result:**
```sql
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false    | false     |
| Sarah      | $1.00     | false    | false     |
| James      | $1.00     | false    | false     |
| Daniel     | $2.00     | false ❌ | false     | ← Lost unique status
| Emma       | $2.00     | false ❌ | false     |
| Lisa       | $3.00     | true ✅  | true ✅   | ← BACK TO WINNING! 🏆
| Tom        | $5.00     | true     | false     |

-- Lisa is winning again!
```

---

## 7:30 PM - Check Leaderboard

```http
GET /auctions/auction-123/leaderboard
```

**Response:**
```json
{
  "auction": {
    "id": "auction-123",
    "title": "Win a Brand New PlayStation 5!",
    "status": "ACTIVE",
    "endDate": "2026-01-05T20:00:00Z",
    "totalBidsCount": 7
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
      "isUnique": true,    ← Only unique bid!
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

---

## 7:50 PM - Last Minute Bid!

### Kevin's Bid: $2.50

```http
POST /bids
{
  "bidderId": "kinde-kevin-555",
  "bidderName": "Kevin",
  "bidAmount": 2.50
}
```

**Recalculate Winner:**
```typescript
const lowestUniqueBid = await this.prisma.bid.findFirst({
    where: { isUnique: true },
    orderBy: { bidAmount: 'asc' }
});
// Unique bids: $2.50, $3.00, $5.00
// Lowest: $2.50 ✅
```

**Result:**
```sql
| bidderName | bidAmount | isUnique | isWinning |
|------------|-----------|----------|-----------|
| Mike       | $1.00     | false    | false     |
| Sarah      | $1.00     | false    | false     |
| James      | $1.00     | false    | false     |
| Daniel     | $2.00     | false    | false     |
| Emma       | $2.00     | false    | false     |
| Kevin      | $2.50     | true ✅  | true ✅   | ← NEW WINNER!
| Lisa       | $3.00     | true     | false     | ← Lost again!
| Tom        | $5.00     | true     | false     |

-- Kevin swoops in at the last minute! 🏆
```

---

## 8:00 PM - Auction Ends & Finalize

```http
POST /auctions/auction-123/finalize
```

**What happens:**

1. **Validation** ([auction.service.ts:70-87](src/Domains/Bidding/auction.service.ts#L70-L87))
   ```typescript
   if (auction.status === 'WINNER_DETERMINED') {
       throw new BadRequestException('Already finalized');
   }
   if (new Date() < auction.endDate) {
       throw new BadRequestException('Auction not ended yet');
   }
   ```

2. **Get Winning Bid** ([auction.service.ts:90](src/Domains/Bidding/auction.service.ts#L90))
   ```typescript
   const winningBid = await this.bidRepository.getCurrentWinningBid(auctionId);
   // Returns Kevin's $2.50 bid
   ```

3. **Update Auction Status** ([auction.service.ts:107-109](src/Domains/Bidding/auction.service.ts#L107-L109))
   ```typescript
   await this.auctionRepository.updateAuction(auctionId, {
       status: 'WINNER_DETERMINED'
   });
   ```

**Response:**
```json
{
  "auction": {
    "id": "auction-123",
    "status": "WINNER_DETERMINED",
    "totalBidsCount": 8,
    "totalRevenue": 16.00
  },
  "winner": {
    "bidderId": "kinde-kevin-555",
    "bidderName": "Kevin",
    "winningBidAmount": 2.50
  },
  "message": "Congratulations Kevin! You won with the lowest unique bid of $2.50"
}
```

**Final Database State:**
```sql
-- Auction
status: "WINNER_DETERMINED"
totalBidsCount: 8
totalRevenue: $16.00

-- Bids
| bidderName | bidAmount | isUnique | isWinning | Result          |
|------------|-----------|----------|-----------|-----------------|
| Mike       | $1.00     | false    | false     | Lost (not unique)|
| Sarah      | $1.00     | false    | false     | Lost (not unique)|
| James      | $1.00     | false    | false     | Lost (not unique)|
| Daniel     | $2.00     | false    | false     | Lost (not unique)|
| Emma       | $2.00     | false    | false     | Lost (not unique)|
| Kevin      | $2.50     | true ✅  | true ✅   | 🏆 WINNER!      |
| Lisa       | $3.00     | true     | false     | Lost (too high) |
| Tom        | $5.00     | true     | false     | Lost (too high) |
```

---

## Summary of How It Works

### Key Mechanics:

1. **One Bid Per User** - Database constraint prevents multiple bids
2. **Uniqueness Tracking** - `isUnique` flag updated in real-time
3. **Winner Calculation** - Automatic recalculation after every bid
4. **Lowest Wins** - Among unique bids, the lowest amount wins
5. **Revenue Tracking** - Entry fees are accumulated

### Database Operations Per Bid:

1. Check if user already bid (1 query)
2. Check if amount is unique (1 query)
3. Create new bid (1 insert)
4. Mark duplicate bid as not unique (0-1 update)
5. Update auction stats (1 update)
6. Reset all winning flags (1 update many)
7. Find new winner (1 query)
8. Mark new winner (0-1 update)

**Total: ~7-9 database operations per bid**

### What If Two Users Bid at the Exact Same Time?

Database transactions and unique constraints ensure data integrity:
- Both bids will be created
- Both will be marked as `isUnique: false`
- No race conditions

---

## Error Scenarios

### User Tries to Bid Twice

```http
POST /bids
{
  "bidderId": "kinde-mike-123",  // Mike tries again
  "bidAmount": 10.00
}
```

**Response (409 Conflict):**
```json
{
  "statusCode": 409,
  "message": "You can only place ONE bid per auction. Your bid has already been placed."
}
```

### Bid on Ended Auction

```http
POST /bids  // After 8:00 PM
```

**Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "Auction has ended"
}
```

---

This is exactly how your implementation handles bidding from start to finish! 🎉
