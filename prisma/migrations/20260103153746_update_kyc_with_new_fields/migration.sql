/*
  Warnings:

  - You are about to drop the column `alienIdNumber` on the `KycProfile` table. All the data in the column will be lost.
  - Added the required column `documentType` to the `KycProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDocumentNumber` to the `KycProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `KycProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proofOfAddressUrl` to the `KycProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE');

-- AlterTable
ALTER TABLE "KycProfile" DROP COLUMN "alienIdNumber",
ADD COLUMN     "documentType" "DocumentType" NOT NULL,
ADD COLUMN     "idDocumentNumber" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "proofOfAddressUrl" TEXT NOT NULL;
