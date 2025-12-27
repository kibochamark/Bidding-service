import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';
export declare class AddressRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAddressesByAccountId(accountId: string): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findAddressById(id: string): Promise<{
        account: {
            kindeId: string;
            id: string;
        };
    } & {
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    createAddress(data: CreateAddressDto): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    updateAddress(id: string, data: UpdateAddressDto): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    deleteAddress(id: string): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
