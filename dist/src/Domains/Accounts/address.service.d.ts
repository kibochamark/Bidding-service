import { AddressRepository } from './address.repository';
import { CreateAddressDto, UpdateAddressDto } from '../../../src/Controllers/Accounts/dto';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: AddressRepository);
    getAddressesByAccountId(accountId: string): Promise<{
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
    getAddressById(id: string): Promise<({
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
    }) | null>;
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
    updateAddress(id: string, data: UpdateAddressDto): Promise<{
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
