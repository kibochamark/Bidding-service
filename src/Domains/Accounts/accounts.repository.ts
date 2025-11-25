import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateAccountDto, UpdateAccountDto } from "src/Controllers/Accounts/dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccountsRepository {
    // Data access methods will be defined here

    constructor(private prisma:PrismaService) {}
    

    async findAllAccounts() {
        return await this.prisma.account.findMany();
    }

    async createAccount(data: CreateAccountDto) {
        try {
            return  await this.prisma.account.create({
                data
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Account with this email already exists.');
            }
            throw error;  
        }
    }

    async findAccountByKindeId(data: UpdateAccountDto) {
        const user =await this.prisma.account.findUnique({
            where: { kindeId: data.kindeId}
        });

        if (!user) {
            throw new ForbiddenException('Account not found.');
        }
        return user;
    }

    async updateAccount(data: UpdateAccountDto) {
        try {
            const updateduser= await this.prisma.account.update({
                where: { kindeId: data.kindeId },
                data
            });

            return updateduser;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new ForbiddenException('Account to update not found.');
            }
            throw error;         
        }
    }

    async deleteAccountByKindeId(data: UpdateAccountDto) {
        try {
            await this.prisma.account.delete({
                where: { kindeId: data.kindeId }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new ForbiddenException('Account to delete not found.');
            }
            throw error;         
        }
    }
}