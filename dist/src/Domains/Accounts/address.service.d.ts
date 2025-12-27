import { AddressRepository } from './address.repository';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: AddressRepository);
    getAddressesByAccountId(accountId: string): Promise<{
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
    getAddressById(id: string): Promise<({
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
    }) | null>;
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
