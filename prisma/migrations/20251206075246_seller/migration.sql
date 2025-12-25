/*
  Warnings:

  - You are about to drop the column `search_vector` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SellerDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_search_vector_idx";

-- DropIndex
DROP INDEX "SellerDetails_userId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "search_vector";

-- AlterTable
ALTER TABLE "SellerDetails" DROP COLUMN "userId",
ADD COLUMN     "responseRate" DECIMAL(65,30) DEFAULT 0.0;
