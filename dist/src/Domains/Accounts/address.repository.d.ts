import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';
export declare class AddressRepository {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAddressesByAccountId(accountId: string): Promise<{
        accountId: string;
        phone: string;
        label: string | null;
        street: string;
        state: string;
        city: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
        recipientname: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAddressById(id: string): Promise<{
        account: {
            kindeId: string;
            id: string;
        };
    } & {
        accountId: string;
        phone: string;
        label: string | null;
        street: string;
        state: string;
        city: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
        recipientname: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAddress(data: CreateAddressDto): Promise<{
        accountId: string;
        phone: string;
        label: string | null;
        street: string;
        state: string;
        city: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
        recipientname: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAddress(id: string, data: Partial<UpdateAddressDto>): Promise<{
        accountId: string;
        phone: string;
        label: string | null;
        street: string;
        state: string;
        city: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
        recipientname: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAddress(id: string): Promise<{
        accountId: string;
        phone: string;
        label: string | null;
        street: string;
        state: string;
        city: string;
        zipCode: string;
        country: string;
        isPrimary: boolean;
        recipientname: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
