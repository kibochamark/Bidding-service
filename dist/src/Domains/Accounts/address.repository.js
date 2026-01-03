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
var AddressRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
let AddressRepository = AddressRepository_1 = class AddressRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AddressRepository_1.name);
    }
    async findAddressesByAccountId(accountId) {
        this.logger.log(`Fetching addresses for account ID: ${accountId}`);
        return await this.prisma.address.findMany({
            where: { accountId },
            orderBy: { label: 'asc' },
        });
    }
    async findAddressById(id) {
        this.logger.log(`Fetching address with ID: ${id}`);
        const address = await this.prisma.address.findUnique({
            where: { id },
            include: {
                account: {
                    select: {
                        id: true,
                        kindeId: true,
                    },
                },
            },
        });
        if (!address) {
            this.logger.warn(`Address with ID: ${id} not found`);
            throw new common_1.NotFoundException(`Address with ID ${id} not found`);
        }
        return address;
    }
    async createAddress(data) {
        this.logger.log(`Creating address for account ID: ${data.accountId}`);
        const account = await this.prisma.account.findUnique({
            where: { kindeId: data.accountId },
        });
        if (!account) {
            this.logger.warn(`Account with ID: ${data.accountId} not found`);
            throw new common_1.NotFoundException(`Account with ID ${data.accountId} not found`);
        }
        if (data.isPrimary) {
            this.logger.log(`Unsetting isPrimary for all existing addresses for account ID: ${data.accountId}`);
            await this.prisma.address.updateMany({
                where: {
                    accountId: data.accountId,
                    isPrimary: true,
                },
                data: {
                    isPrimary: false,
                },
            });
        }
        this.logger.log(`Account found for ID: ${data.accountId}, proceeding to create address`);
        return await this.prisma.address.create({
            data: {
                accountId: data.accountId,
                recipientname: data.recipientName,
                phone: data.phone,
                label: data.label,
                street: data.street,
                state: data.state,
                city: data.city,
                zipCode: data.zipCode,
                country: data.country,
                isPrimary: data.isPrimary,
            },
        });
    }
    async updateAddress(id, data) {
        this.logger.log(`Updating address with ID: ${id}`);
        const existingaddress = await this.findAddressById(id);
        if (!existingaddress) {
            this.logger.warn(`Address with ID: ${id} not found`);
            throw new common_1.NotFoundException(`Address with ID ${id} not found`);
        }
        if (data.isPrimary === true) {
            this.logger.log(`Unsetting isPrimary for all other addresses for account ID: ${existingaddress.accountId}`);
            await this.prisma.address.updateMany({
                where: {
                    accountId: existingaddress.accountId,
                    isPrimary: true,
                    id: { not: id },
                },
                data: {
                    isPrimary: false,
                },
            });
        }
        this.logger.log(`Address found for ID: ${id}, proceeding to update`);
        return await this.prisma.address.update({
            where: { id },
            data: {
                ...data
            },
        });
    }
    async deleteAddress(id) {
        const existingaddress = await this.findAddressById(id);
        if (!existingaddress) {
            this.logger.warn(`Address with ID: ${id} not found`);
            throw new common_1.NotFoundException(`Address with ID ${id} not found`);
        }
        this.logger.log(`Deleting address with ID: ${id}`);
        return await this.prisma.address.delete({
            where: { id },
        });
    }
};
exports.AddressRepository = AddressRepository;
exports.AddressRepository = AddressRepository = AddressRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressRepository);
//# sourceMappingURL=address.repository.js.map