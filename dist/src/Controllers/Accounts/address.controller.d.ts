import { AddressService } from '../../../src/Domains/Accounts/address.service';
import { AddressParamDto, CreateAddressDto, UpdateAddressDto } from './dto';
export declare class AddressController {
    private addressService;
    constructor(addressService: AddressService);
    getAddressesByAccountId(accountId: string): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        userId: string;
    }[]>;
    getAddressById(params: AddressParamDto): Promise<({
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
        userId: string;
    }) | null>;
    createAddress(createAddressDto: CreateAddressDto): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        userId: string;
    }>;
    updateAddress(params: AddressParamDto, updateAddressDto: UpdateAddressDto): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        userId: string;
    }>;
    deleteAddress(params: AddressParamDto): Promise<{
        accountId: string;
        label: string | null;
        street: string;
        city: string;
        zipCode: string;
        country: string;
        id: string;
        userId: string;
    }>;
}
