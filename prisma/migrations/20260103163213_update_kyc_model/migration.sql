/*
  Warnings:

  - You are about to drop the column `userId` on the `KycProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idDocumentNumber]` on the table `KycProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "KycProfile_userId_key";

-- AlterTable
ALTER TABLE "KycProfile" DROP COLUMN "userId",
ALTER COLUMN "idDocumentUrl" DROP NOT NULL,
ALTER COLUMN "proofOfAddressUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KycProfile_idDocumentNumber_key" ON "KycProfile"("idDocumentNumber");
