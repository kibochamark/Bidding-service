export interface KindeUser {
    kindeId: string;
    email: string;
    givenName?: string;
    familyName?: string;
    permissions: string[];
    roles: Array<{
        key: string;
        name: string;
    }>;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
