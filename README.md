# API Endpoints Documentation

Base URL: `http://localhost:4000`

## Table of Contents
- [Accounts](#accounts)
- [Addresses](#addresses)
- [KYC](#kyc)
- [Products](#products)
- [Categories](#categories)

---

## Accounts

### GET /accounts
Get all accounts

**Query Parameters:** None

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  kindeId: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}[]
```

---

### POST /accounts
Create a new account (Webhook handler for Kinde user.created event)

**Query Parameters:** None

**Request Body:**
```typescript
{
  type: string;
  data: {
    user: {
      id: string;
      email?: string;
      first_name?: string;
      last_name?: string;
    };
  };
}
```

**Response:**
```typescript
{
  id: string;
  kindeId: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### GET /accounts/:kindeId
Get account by Kinde ID

**Path Parameters:**
- `kindeId` (string, required): Kinde user ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  kindeId: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Addresses

### GET /addresses
Get all addresses for a specific account

**Query Parameters:**
- `accountId` (string, required): Account ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  accountId: string;
  label?: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}[]
```

---

### GET /addresses/:id
Get a single address by ID

**Path Parameters:**
- `id` (UUID, required): Address ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  accountId: string;
  label?: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### POST /addresses
Create a new address

**Query Parameters:** None

**Request Body:**
```typescript
{
  accountId: string;           // Required
  label?: string;              // Optional: "Home", "Office", etc.
  street: string;              // Required
  city: string;                // Required
  zipCode: string;             // Required
  country: string;             // Required
}
```

**Response:**
```typescript
{
  id: string;
  accountId: string;
  label?: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### PATCH /addresses/:id
Update an existing address

**Path Parameters:**
- `id` (UUID, required): Address ID

**Request Body:**
```typescript
{
  label?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}
```

**Response:**
```typescript
{
  id: string;
  accountId: string;
  label?: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### DELETE /addresses/:id
Delete an address

**Path Parameters:**
- `id` (UUID, required): Address ID

**Request Body:** None

**Response:**
```typescript
{
  message: string;
}
```

---

## KYC

### GET /kyc
Get all KYC submissions (Admin only)

**Query Parameters:**
- `status` (string, optional): Filter by KYC status - "PENDING" | "APPROVED" | "REJECTED"

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  accountId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  idDocumentUrl: string;
  selfieUrl?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}[]
```

---

### GET /kyc/status
Get KYC status for the authenticated user

**Query Parameters:**
- `accountId` (string, required): Account ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  accountId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  idDocumentUrl: string;
  selfieUrl?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}
```

---

### GET /kyc/:id
Get KYC by ID (Admin only)

**Path Parameters:**
- `id` (UUID, required): KYC ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  accountId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  idDocumentUrl: string;
  selfieUrl?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}
```

---

### POST /kyc
Submit KYC documents for verification

**Query Parameters:** None

**Request Body:**
```typescript
{
  accountId: string;           // Required
  idDocumentUrl: string;       // Required: URL to uploaded ID document
  selfieUrl?: string;          // Optional: URL to uploaded selfie
}
```

**Response:**
```typescript
{
  id: string;
  accountId: string;
  status: "PENDING";
  idDocumentUrl: string;
  selfieUrl?: string;
  submittedAt: Date;
}
```

---

### PATCH /kyc/:id
Update KYC status (Admin only - approve/reject)

**Path Parameters:**
- `id` (UUID, required): KYC ID

**Request Body:**
```typescript
{
  status: "PENDING" | "APPROVED" | "REJECTED";  // Required
  rejectionReason?: string;                      // Optional: Required if status is REJECTED
  reviewedBy: string;                            // Required: Kinde ID of the admin
}
```

**Response:**
```typescript
{
  id: string;
  accountId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  idDocumentUrl: string;
  selfieUrl?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}
```

---

### DELETE /kyc/:id
Delete KYC profile (Admin only)

**Path Parameters:**
- `id` (UUID, required): KYC ID

**Request Body:** None

**Response:**
```typescript
{
  message: string;
}
```

---

## Products

### POST /products
Create a new product listing

**Query Parameters:** None

**Request Body:**
```typescript
{
  title: string;                              // Required
  description: string;                        // Required
  categoryId: string;                         // Required
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";  // Required
  images: string[];                           // Required: Array of image URLs
  startingPrice: number;                      // Required: >= 0
  reservePrice?: number;                      // Optional: >= 0
  buyNowPrice?: number;                       // Optional: >= 0
  endDate: string;                            // Required: ISO date string
  sellerId: string;                           // Required
  sellerName: string;                         // Required
  specifications: Record<string, any>;        // Required: Object with product specs
}
```

**Response:**
```typescript
{
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  images: string[];
  startingPrice: number;
  reservePrice?: number;
  buyNowPrice?: number;
  currentBid?: number;
  endDate: Date;
  sellerId: string;
  sellerName: string;
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### GET /products/search
Search products with filters and pagination

**Query Parameters:**
- `query` (string, optional): Full-text search query
- `categoryId` (string, optional): Filter by category ID
- `condition` (string, optional): Filter by condition - "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR"
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `sellerId` (string, optional): Filter by seller ID
- `isActive` (boolean, optional): Filter by active status
- `sortBy` (string, optional): Sort order - "newest" | "ending_soon" | "highest_bid" | "lowest_price"
- `page` (number, optional): Page number (>= 1)
- `limit` (number, optional): Items per page (>= 1)
- `cursor` (string, optional): Cursor for cursor-based pagination

**Request Body:** None

**Response:**
```typescript
{
  products: {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    condition: string;
    images: string[];
    startingPrice: number;
    reservePrice?: number;
    buyNowPrice?: number;
    currentBid?: number;
    endDate: Date;
    sellerId: string;
    sellerName: string;
    specifications: Record<string, any>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

### GET /products/ending-soon
Get products ending within 24 hours

**Query Parameters:**
- `limit` (number, optional): Number of products to return

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  images: string[];
  startingPrice: number;
  currentBid?: number;
  endDate: Date;
  sellerId: string;
  sellerName: string;
  isActive: boolean;
}[]
```

---

### GET /products/newest
Get newest product listings

**Query Parameters:**
- `limit` (number, optional): Number of products to return

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  images: string[];
  startingPrice: number;
  currentBid?: number;
  endDate: Date;
  sellerId: string;
  sellerName: string;
  isActive: boolean;
  createdAt: Date;
}[]
```

---

### GET /products/category/:categoryId
Get products by category

**Path Parameters:**
- `categoryId` (string, required): Category ID

**Query Parameters:**
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Request Body:** None

**Response:**
```typescript
{
  products: {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    condition: string;
    images: string[];
    startingPrice: number;
    currentBid?: number;
    endDate: Date;
    sellerId: string;
    sellerName: string;
    isActive: boolean;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

### GET /products/seller/:sellerId
Get products by seller

**Path Parameters:**
- `sellerId` (string, required): Seller ID

**Query Parameters:**
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Request Body:** None

**Response:**
```typescript
{
  products: {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    condition: string;
    images: string[];
    startingPrice: number;
    currentBid?: number;
    endDate: Date;
    sellerId: string;
    sellerName: string;
    isActive: boolean;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

### GET /products/:id
Get single product by ID

**Path Parameters:**
- `id` (UUID, required): Product ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  images: string[];
  startingPrice: number;
  reservePrice?: number;
  buyNowPrice?: number;
  currentBid?: number;
  endDate: Date;
  sellerId: string;
  sellerName: string;
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### PATCH /products/:id
Update product

**Path Parameters:**
- `id` (UUID, required): Product ID

**Request Body:**
```typescript
{
  title?: string;
  description?: string;
  condition?: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";
  images?: string[];
  reservePrice?: number;           // >= 0
  buyNowPrice?: number;            // >= 0
  endDate?: string;                // ISO date string
  specifications?: Record<string, any>;
  isActive?: boolean;
}
```

**Response:**
```typescript
{
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  images: string[];
  startingPrice: number;
  reservePrice?: number;
  buyNowPrice?: number;
  currentBid?: number;
  endDate: Date;
  sellerId: string;
  sellerName: string;
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### DELETE /products/:id
Delete product

**Path Parameters:**
- `id` (UUID, required): Product ID

**Request Body:** None

**Response:**
```typescript
{
  message: string;
}
```

---

## Categories

### POST /categories
Create a new category (Admin only)

**Query Parameters:** None

**Request Body:**
```typescript
{
  slug: string;                // Required: URL-friendly identifier
  name: string;                // Required: Display name
  description?: string;        // Optional
  icon?: string;               // Optional: Icon identifier or URL
  parentId?: string;           // Optional: UUID of parent category
}
```

**Response:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### GET /categories
Get all categories

**Query Parameters:** None

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}[]
```

---

### GET /categories/root
Get only root categories (no parent)

**Query Parameters:** None

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  parentId: null;
  createdAt: Date;
  updatedAt: Date;
}[]
```

---

### GET /categories/slug/:slug
Get category by slug

**Path Parameters:**
- `slug` (string, required): Category slug

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### GET /categories/:id
Get category by ID

**Path Parameters:**
- `id` (UUID, required): Category ID

**Request Body:** None

**Response:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### PATCH /categories/:id
Update category (Admin only)

**Path Parameters:**
- `id` (UUID, required): Category ID

**Request Body:**
```typescript
{
  name?: string;
  description?: string;
  icon?: string;
  parentId?: string;          // UUID of parent category
}
```

**Response:**
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### DELETE /categories/:id
Delete category (Admin only)

**Path Parameters:**
- `id` (UUID, required): Category ID

**Request Body:** None

**Response:**
```typescript
{
  message: string;
}
```

---

## Enums and Types

### ProductCondition
```typescript
"NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR"
```

### KycStatus
```typescript
"PENDING" | "APPROVED" | "REJECTED"
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```typescript
{
  statusCode: 400;
  message: string | string[];
  error: "Bad Request";
}
```

### 404 Not Found
```typescript
{
  statusCode: 404;
  message: string;
  error: "Not Found";
}
```

### 500 Internal Server Error
```typescript
{
  statusCode: 500;
  message: string;
  error: "Internal Server Error";
}
```

---

## Notes

1. All UUIDs are in standard UUID v4 format
2. All dates are returned as ISO 8601 strings
3. Validation is enforced globally with `class-validator`
4. Authentication guards are currently commented out but will be enabled in production
5. Admin-only endpoints will require proper permissions when authentication is enabled
6. The API uses NestJS ValidationPipe with `whitelist: true` to strip unexpected properties




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
