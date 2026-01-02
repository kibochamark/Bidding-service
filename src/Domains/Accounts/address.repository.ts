import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';

@Injectable()
export class AddressRepository {
    private readonly logger = new Logger(AddressRepository.name);
    constructor(private prisma: PrismaService) {}

    /**
     * Find all addresses for a specific account
     */
    async findAddressesByAccountId(accountId: string) {
        this.logger.log(`Fetching addresses for account ID: ${accountId}`);
        return await this.prisma.address.findMany({
            where: { accountId },
            orderBy: { label: 'asc' },
        });
    }

    /**
     * Find a single address by ID
     */
    async findAddressById(id: string) {
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
            throw new NotFoundException(`Address with ID ${id} not found`);
        }

        return address;
    }

    /**
     * Create a new address
     */
    async createAddress(data: CreateAddressDto) {
        // Verify account exists

        this.logger.log(`Creating address for account ID: ${data.accountId}`);
        const account = await this.prisma.account.findUnique({
            where: { kindeId: data.accountId },
        });

        if (!account) {
            this.logger.warn(`Account with ID: ${data.accountId} not found`);
            throw new NotFoundException(`Account with ID ${data.accountId} not found`);
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

    /**
     * Update an existing address
     */
    async updateAddress(id: string, data: Partial<UpdateAddressDto>) {
        // Verify address exists
        this.logger.log(`Updating address with ID: ${id}`);

        const existingaddress =await this.findAddressById(id);

        if (!existingaddress) {
            this.logger.warn(`Address with ID: ${id} not found`);
            throw new NotFoundException(`Address with ID ${id} not found`);
        }

        this.logger.log(`Address found for ID: ${id}, proceeding to update`);

        return await this.prisma.address.update({
            where: { id },
            data: {
                ...data
            },
        });
    }

    /**
     * Delete an address
     */
    async deleteAddress(id: string) {
        // Verify address exists
        const existingaddress = await this.findAddressById(id);
        if (!existingaddress) {
            this.logger.warn(`Address with ID: ${id} not found`);
            throw new NotFoundException(`Address with ID ${id} not found`);
        }

        this.logger.log(`Deleting address with ID: ${id}`);

        return await this.prisma.address.delete({
            where: { id },
        });
    }
}
