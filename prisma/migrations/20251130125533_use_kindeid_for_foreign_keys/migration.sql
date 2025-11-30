-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_accountId_fkey";

-- DropForeignKey
ALTER TABLE "KycProfile" DROP CONSTRAINT "KycProfile_accountId_fkey";

-- DropForeignKey
ALTER TABLE "SellerDetails" DROP CONSTRAINT "SellerDetails_accountId_fkey";

-- AddForeignKey
ALTER TABLE "KycProfile" ADD CONSTRAINT "KycProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("kindeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerDetails" ADD CONSTRAINT "SellerDetails_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("kindeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("kindeId") ON DELETE RESTRICT ON UPDATE CASCADE;
