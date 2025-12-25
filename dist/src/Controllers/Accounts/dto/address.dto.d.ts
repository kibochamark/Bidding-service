export declare class CreateAddressDto {
    accountId: string;
    label?: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
}
export declare class UpdateAddressDto {
    label?: string;
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
}
export declare class AddressParamDto {
    id: string;
}
