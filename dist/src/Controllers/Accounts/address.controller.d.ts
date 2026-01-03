import { AddressService } from '../../../src/Domains/Accounts/address.service';
import { AddressParamDto, CreateAddressDto, UpdateAddressDto } from './dto';
export declare class AddressController {
    private addressService;
    private readonly logger;
    constructor(addressService: AddressService);
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
    getAddressById(params: AddressParamDto): Promise<({
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
    createAddress(createAddressDto: CreateAddressDto): Promise<{
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
    updateAddress(params: AddressParamDto, updateAddressDto: UpdateAddressDto): Promise<{
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
    deleteAddress(params: AddressParamDto): Promise<{
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
