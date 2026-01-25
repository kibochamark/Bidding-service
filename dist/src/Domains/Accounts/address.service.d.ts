import { AddressRepository } from './address.repository';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: AddressRepository);
    getAddressesByAccountId(accountId: string): Promise<{
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
    getAddressById(id: string): Promise<({
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
    }) | null>;
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
    updateAddress(id: string, data: UpdateAddressDto): Promise<{
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
