import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';
export declare class AddressRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAddressesByAccountId(accountId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        recipientname: string;
        phone: string;
        label: string | null;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
    }[]>;
    findAddressById(id: string): Promise<{
        account: {
            id: string;
            kindeId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        recipientname: string;
        phone: string;
        label: string | null;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
    }>;
    createAddress(data: CreateAddressDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        recipientname: string;
        phone: string;
        label: string | null;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
    }>;
    updateAddress(id: string, data: Partial<UpdateAddressDto>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        recipientname: string;
        phone: string;
        label: string | null;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
    }>;
    deleteAddress(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        recipientname: string;
        phone: string;
        label: string | null;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
    }>;
}
