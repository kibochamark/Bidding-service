# Product Catalog Schema Design

## Overview
Scalable, high-performance schema for an electronics bidding platform with full-text search, efficient filtering, and pagination support.

---

## Models

### 1. Category
Hierarchical category system supporting nested categories.

```prisma
model Category {
  id          String   @id @default(uuid())
  slug        String   @unique     // URL-friendly: "smartphones", "laptops"
  name        String                // Display name: "Smartphones", "Laptops"
  description String?
  icon        String?               // Icon identifier or URL
  parentId    String?               // Enables nested categories
  parent      Category?
  children    Category[]
  products    Product[]
}
```

**Example Categories:**
- Electronics (parent)
  - Smartphones (child)
  - Laptops (child)
  - Audio (child)
    - Headphones (nested child)
    - Earbuds (nested child)

---

### 2. Product
Core product listing with bidding information.

```prisma
model Product {
  id            String   @id
  title         String
  description   String
  categoryId    String
  condition     ProductCondition
  images        String[]          // R2/S3 URLs

  // Pricing
  startingPrice Decimal
  currentBid    Decimal
  bidsCount     Int
  reservePrice  Decimal?          // Hidden minimum
  buyNowPrice   Decimal?          // Skip auction

  // Auction
  startDate     DateTime
  endDate       DateTime
  isActive      Boolean

  // Seller (denormalized for performance)
  sellerId      String
  sellerName    String
  sellerRating  Decimal

  // Product reputation
  rating        Decimal
  reviewCount   Int

  // Dynamic specifications (JSONB)
  specifications Json
}
```

**specifications** field example:
```json
{
  "Storage": "256GB",
  "Color": "Deep Purple",
  "Battery Health": "94%",
  "Screen Condition": "Excellent",
  "Warranty": "None"
}
```

---

### 3. ProductCondition Enum
```prisma
enum ProductCondition {
  NEW        // Brand new, sealed
  MINT       // Like new, no visible wear
  EXCELLENT  // Minimal signs of use
  GOOD       // Normal wear, fully functional
  FAIR       // Noticeable wear, fully functional
}
```

---

## Indexing Strategy

### Composite Indexes (for common queries)

1. **Category + Active + Ending Soon**
   ```
   @@index([categoryId, isActive, endDate(sort: Desc)])
   ```
   - Use case: "Show all active smartphones, ending soonest first"
   - O(log n) lookup with binary search

2. **Seller's Active Listings**
   ```
   @@index([sellerId, isActive])
   ```
   - Use case: "View my active auctions"

3. **Ending Soon (Homepage)**
   ```
   @@index([isActive, endDate(sort: Asc)])
   ```
   - Use case: "Auctions ending in next 24 hours"

4. **Highest Bids**
   ```
   @@index([isActive, currentBid(sort: Desc)])
   ```
   - Use case: "Show highest value auctions"

5. **Newest Listings**
   ```
   @@index([isActive, createdAt(sort: Desc)])
   ```
   - Use case: "Recently added products"

6. **Condition Filter**
   ```
   @@index([condition, isActive])
   ```
   - Use case: "Show only MINT condition items"

7. **Price Range**
   ```
   @@index([startingPrice, currentBid])
   ```
   - Use case: "Products between $100-$500"

8. **Title Search**
   ```
   @@index([title])
   ```
   - Use case: Basic text matching

---

## Full-Text Search Implementation

### PostgreSQL tsvector + GIN Index

**What we added:**
1. `search_vector` column (type: tsvector)
2. Automatic trigger to update search_vector on INSERT/UPDATE
3. GIN index on search_vector for O(log n) search

**How it works:**
```sql
-- Title has higher weight (A) than description (B)
search_vector =
  setweight(to_tsvector('english', title), 'A') ||
  setweight(to_tsvector('english', description), 'B')
```

**Query example:**
```sql
SELECT * FROM "Product"
WHERE search_vector @@ to_tsquery('english', 'iphone & 256gb')
AND isActive = true
ORDER BY ts_rank(search_vector, to_tsquery('english', 'iphone & 256gb')) DESC
LIMIT 20;
```

**Performance:**
- GIN index provides O(log n) search
- Supports stemming ("running" matches "run")
- Relevance ranking with `ts_rank()`
- AND/OR/NOT operators

---

## Pagination Strategy

### Cursor-Based Pagination (Recommended)

**Why cursor over offset?**
- ✅ Consistent results (no skipped/duplicate items)
- ✅ O(log n) performance at any page
- ✅ Works with real-time data
- ❌ Can't jump to arbitrary page

**Implementation:**
```typescript
// Page 1
const products = await prisma.product.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
});

// Page 2 (use last item's createdAt as cursor)
const nextPage = await prisma.product.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
  cursor: { id: products[products.length - 1].id },
  skip: 1, // Skip the cursor itself
});
```

### Offset Pagination (Alternative)

**Use when:**
- Need page numbers (1, 2, 3...)
- Jumping to specific pages required

**Implementation:**
```typescript
const page = 2;
const pageSize = 20;

const products = await prisma.product.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  skip: (page - 1) * pageSize,
  take: pageSize,
});

const total = await prisma.product.count({ where: { isActive: true } });
const totalPages = Math.ceil(total / pageSize);
```

---

## Common Query Patterns

### 1. Category Browse with Filters
```typescript
const products = await prisma.product.findMany({
  where: {
    categoryId: 'smartphones-uuid',
    isActive: true,
    condition: { in: ['MINT', 'EXCELLENT'] },
    currentBid: { gte: 500, lte: 1000 },
  },
  orderBy: { endDate: 'asc' },
  take: 20,
});
```
**Uses index:** `[categoryId, isActive, endDate]`

### 2. Full-Text Search
```typescript
const searchResults = await prisma.$queryRaw`
  SELECT *,
    ts_rank(search_vector, to_tsquery('english', ${query})) as rank
  FROM "Product"
  WHERE search_vector @@ to_tsquery('english', ${query})
  AND "isActive" = true
  ORDER BY rank DESC
  LIMIT 20
`;
```
**Uses index:** GIN on `search_vector`

### 3. Seller's Dashboard
```typescript
const myListings = await prisma.product.findMany({
  where: {
    sellerId: user.kindeId,
    isActive: true,
  },
  orderBy: { endDate: 'asc' },
  include: { category: true },
});
```
**Uses index:** `[sellerId, isActive]`

### 4. Ending Soon (Homepage)
```typescript
const endingSoon = await prisma.product.findMany({
  where: {
    isActive: true,
    endDate: { lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
  },
  orderBy: { endDate: 'asc' },
  take: 10,
});
```
**Uses index:** `[isActive, endDate]`

---

## Performance Characteristics

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Category filter | O(log n) | Uses composite index |
| Price range | O(log n) | Uses price index |
| Full-text search | O(log n) | GIN index |
| Cursor pagination | O(log n) | Index-backed |
| Offset pagination | O(n + offset) | Slower for deep pages |
| Seller's listings | O(log n) | Uses seller index |

---

## Scalability Notes

### Current Design Supports:
- ✅ **Millions of products** (indexed queries)
- ✅ **Real-time search** (GIN index + tsvector)
- ✅ **Complex filters** (composite indexes)
- ✅ **Flexible specs** (JSONB for dynamic fields)

### Future Optimizations (if needed):
1. **Read replicas** for search queries
2. **Elasticsearch** for advanced search (fuzzy, autocomplete)
3. **Redis cache** for hot products
4. **Partitioning** by date (archive old auctions)
5. **Materialized views** for analytics

---

## Example Data

See `mockProducts` array in your frontend for data shape.

**Category seeding:**
```typescript
await prisma.category.createMany({
  data: [
    { slug: 'smartphones', name: 'Smartphones' },
    { slug: 'laptops', name: 'Laptops' },
    { slug: 'tablets', name: 'Tablets' },
    { slug: 'audio', name: 'Audio' },
    { slug: 'wearables', name: 'Wearables' },
  ],
});
```
