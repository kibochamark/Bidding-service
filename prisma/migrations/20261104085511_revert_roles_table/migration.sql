-- Revert of 20261104072941_add_roles_table: drop Account.roleName and the Role table.
-- Roles/permissions are managed in Kinde instead; see RbacGuard.

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_roleName_fkey";

-- DropIndex
DROP INDEX "Account_roleName_idx";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "roleName";

-- DropTable
DROP TABLE "Role";
