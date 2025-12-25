export declare class CreateAccountDto {
    type: string;
    data: {
        user: {
            id: string;
            email?: string;
            first_name?: string;
            last_name?: string;
        };
    };
}
export declare class ManualCreateAccountDto {
    kindeId: string;
    email?: string;
}
export declare class AccountParamDto {
    kindeId: string;
}
