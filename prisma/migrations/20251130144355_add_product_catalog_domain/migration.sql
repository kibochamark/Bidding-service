-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('MINT', 'EXCELLENT', 'GOOD', 'FAIR', 'NEW');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "condition" "ProductCondition" NOT NULL DEFAULT 'GOOD',
    "images" TEXT[],
    "startingPrice" DECIMAL(10,2) NOT NULL,
    "currentBid" DECIMAL(10,2) NOT NULL,
    "bidsCount" INTEGER NOT NULL DEFAULT 0,
    "reservePrice" DECIMAL(10,2),
    "buyNowPrice" DECIMAL(10,2),
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sellerId" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerRating" DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "specifications" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Product_categoryId_isActive_endDate_idx" ON "Product"("categoryId", "isActive", "endDate" DESC);

-- CreateIndex
CREATE INDEX "Product_sellerId_isActive_idx" ON "Product"("sellerId", "isActive");

-- CreateIndex
CREATE INDEX "Product_isActive_endDate_idx" ON "Product"("isActive", "endDate" ASC);

-- CreateIndex
CREATE INDEX "Product_isActive_currentBid_idx" ON "Product"("isActive", "currentBid" DESC);

-- CreateIndex
CREATE INDEX "Product_isActive_createdAt_idx" ON "Product"("isActive", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Product_condition_isActive_idx" ON "Product"("condition", "isActive");

-- CreateIndex
CREATE INDEX "Product_title_idx" ON "Product"("title");

-- CreateIndex
CREATE INDEX "Product_startingPrice_currentBid_idx" ON "Product"("startingPrice", "currentBid");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
