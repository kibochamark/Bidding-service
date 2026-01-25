import { AddressService } from '../../../src/Domains/Accounts/address.service';
import { AddressParamDto, CreateAddressDto, UpdateAddressDto } from './dto';
export declare class AddressController {
    private addressService;
    private readonly logger;
    constructor(addressService: AddressService);
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
    getAddressById(params: AddressParamDto): Promise<({
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
    createAddress(createAddressDto: CreateAddressDto): Promise<{
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
    updateAddress(params: AddressParamDto, updateAddressDto: UpdateAddressDto): Promise<{
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
    deleteAddress(params: AddressParamDto): Promise<{
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
