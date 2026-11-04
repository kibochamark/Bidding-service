-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- Seed default roles (required before Account.roleName can reference them)
INSERT INTO "Role" ("id", "name", "description", "createdAt", "updatedAt")
VALUES
    ('00000000-0000-0000-0000-000000000001', 'USER', 'Standard user. Default role for newly created accounts.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('00000000-0000-0000-0000-000000000002', 'ADMIN', 'Administrator. Can manage listings, auctions, and other accounts.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "roleName" TEXT NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE INDEX "Account_roleName_idx" ON "Account"("roleName");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
