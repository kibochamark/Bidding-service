import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AccountParamDto } from "src/Controllers/Accounts/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccountsRepository {
    constructor(private prisma: PrismaService) {}

    async findAllAccounts() {
        return await this.prisma.account.findMany({
            include: {
                kyc: true,
                sellerProfile: true,
            },
        });
    }

    /**
     * Find account by kindeId (returns null if not found)
     * Used for checking existence without throwing errors
     */
    async findAccountByKindeIdRaw(kindeId: string) {
        return await this.prisma.account.findUnique({
            where: { kindeId },
            include: {
                kyc: true,
                sellerProfile: true,
                addresses: true,
            },
        });
    }

    /**
     * Find account by kindeId (throws error if not found)
     */
    async findAccountByKindeId(data: AccountParamDto) {
        const user = await this.findAccountByKindeIdRaw(data.kindeId);

        if (!user) {
            throw new NotFoundException('Account not found.');
        }
        return user;
    }

    /**
     * Create account from Kinde webhook
     */
    async createAccountFromWebhook(data: { kindeId: string }) {
        try {
            return await this.prisma.account.create({
                data: {
                    kindeId: data.kindeId,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Account with this Kinde ID already exists.');
            }
            throw error;
        }
    }

    /**
     * Update account by kindeId
     */
    async updateAccount(kindeId: string, data: Partial<{ kindeId: string }>) {
        try {
            const updatedUser = await this.prisma.account.update({
                where: { kindeId },
                data,
            });

            return updatedUser;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Account to update not found.');
            }
            throw error;
        }
    }

    /**
     * Delete account by kindeId
     */
    async deleteAccountByKindeId(kindeId: string) {
        try {
            await this.prisma.account.delete({
                where: { kindeId },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Account to delete not found.');
            }
            throw error;
        }
    }
}