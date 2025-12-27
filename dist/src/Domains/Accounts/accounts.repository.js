"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AccountsRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
let AccountsRepository = AccountsRepository_1 = class AccountsRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AccountsRepository_1.name);
    }
    async findAllAccounts() {
        return await this.prisma.account.findMany({
            include: {
                kyc: true,
                sellerProfile: true,
            },
        });
    }
    async findAccountByKindeIdRaw(kindeId) {
        return await this.prisma.account.findUnique({
            where: { kindeId },
            include: {
                kyc: true,
                sellerProfile: true,
                addresses: true,
            },
        });
    }
    async findAccountByKindeId(data) {
        const user = await this.findAccountByKindeIdRaw(data.kindeId);
        if (!user) {
            throw new common_1.NotFoundException('Account not found.');
        }
        return user;
    }
    async createAccountFromWebhook(data) {
        try {
            return await this.prisma.account.create({
                data: {
                    kindeId: data.kindeId,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ForbiddenException('Account with this Kinde ID already exists.');
            }
            throw error;
        }
    }
    async updateAccount(kindeId, data) {
        this.logger.log(`Updating account ${kindeId} with data: ${JSON.stringify(data)}`);
        try {
            const updatedUser = await this.prisma.account.update({
                where: { kindeId },
                data: {
                    contact: data.contact,
                    fullName: data.fullName,
                    email: data.email,
                },
            });
            return updatedUser;
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Account to update not found.');
            }
            throw error;
        }
    }
    async deleteAccountByKindeId(kindeId) {
        try {
            await this.prisma.account.delete({
                where: { kindeId },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Account to delete not found.');
            }
            throw error;
        }
    }
};
exports.AccountsRepository = AccountsRepository;
exports.AccountsRepository = AccountsRepository = AccountsRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsRepository);
//# sourceMappingURL=accounts.repository.js.map