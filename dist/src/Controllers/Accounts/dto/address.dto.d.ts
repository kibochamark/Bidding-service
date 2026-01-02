export declare class CreateAddressDto {
    accountId: string;
    phone: string;
    recipientName: string;
    label?: string;
    street: string;
    state: string;
    city: string;
    zipCode: string;
    country: string;
    isPrimary: boolean;
}
export declare class UpdateAddressDto {
    recipientname?: string;
    phone?: string;
    state?: string;
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    isPrimary?: boolean;
}
export declare class AddressParamDto {
    id: string;
}
