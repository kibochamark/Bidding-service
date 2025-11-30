-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_accountId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
