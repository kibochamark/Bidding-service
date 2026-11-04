/*
  Warnings:

  - You are about to drop the column `bidsCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `buyNowPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `currentBid` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reservePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `startingPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `KycProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entryFeePaid` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentIntentId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryFee` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailValue` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE', 'SELFIE', 'PROOF_OF_ADDRESS');

-- DropForeignKey
ALTER TABLE "KycProfile" DROP CONSTRAINT "KycProfile_accountId_fkey";

-- DropIndex
DROP INDEX "Bid_auctionId_bidderId_key";

-- DropIndex
DROP INDEX "Product_isActive_currentBid_idx";

-- DropIndex
DROP INDEX "Product_startingPrice_currentBid_idx";

-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "entryFeePaid" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "paymentIntentId" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "totalPaid" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "bidsCount",
DROP COLUMN "buyNowPrice",
DROP COLUMN "currentBid",
DROP COLUMN "reservePrice",
DROP COLUMN "startingPrice",
ADD COLUMN     "entryFee" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "retailValue" DECIMAL(10,2) NOT NULL;

-- DropTable
DROP TABLE "KycProfile";

-- CreateIndex
CREATE INDEX "Product_retailValue_idx" ON "Product"("retailValue");
