/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientname` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `KycProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `KycProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('ACTIVE', 'ENDED', 'CANCELLED', 'WINNER_DETERMINED');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "contact" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT;

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId",
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "recipientname" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "KycProfile" ADD COLUMN     "alienIdNumber" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "search_vector" tsvector;

-- CreateTable
CREATE TABLE "Auction" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prizeValue" DECIMAL(10,2) NOT NULL,
    "entryFee" DECIMAL(10,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "AuctionStatus" NOT NULL DEFAULT 'ACTIVE',
    "winnerId" TEXT,
    "winningBidAmount" DECIMAL(10,2),
    "totalBidsCount" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "bidderName" TEXT NOT NULL,
    "bidAmount" DECIMAL(10,2) NOT NULL,
    "isUnique" BOOLEAN NOT NULL DEFAULT true,
    "isWinning" BOOLEAN NOT NULL DEFAULT false,
    "placedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Auction_status_endDate_idx" ON "Auction"("status", "endDate");

-- CreateIndex
CREATE INDEX "Auction_productId_idx" ON "Auction"("productId");

-- CreateIndex
CREATE INDEX "Auction_winnerId_idx" ON "Auction"("winnerId");

-- CreateIndex
CREATE INDEX "Bid_auctionId_bidAmount_idx" ON "Bid"("auctionId", "bidAmount");

-- CreateIndex
CREATE INDEX "Bid_auctionId_isUnique_bidAmount_idx" ON "Bid"("auctionId", "isUnique", "bidAmount");

-- CreateIndex
CREATE INDEX "Bid_bidderId_idx" ON "Bid"("bidderId");

-- CreateIndex
CREATE UNIQUE INDEX "Bid_auctionId_bidderId_key" ON "Bid"("auctionId", "bidderId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "Product_search_vector_idx" ON "Product" USING GIN ("search_vector");

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
