import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

/**
 * DTO for Kinde webhook - when a user is created in Kinde
 * This is used by the POST /accounts endpoint which acts as a webhook handler
 *
 * Kinde webhook payload structure:
 * {
 *   "type": "user.created",
 *   "data": {
 *     "user": {
 *       "id": "kp_abc123",
 *       "email": "user@example.com",
 *       ...
 *     }
 *   }
 * }
 */
export class CreateAccountDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsObject()
    data: {
        user: {
            id: string;
            email?: string;
            first_name?: string;
            last_name?: string;
        };
    };
}

/**
 * DTO for manually creating an account (for testing or migration)
 */
export class ManualCreateAccountDto {
    @IsNotEmpty()
    @IsString()
    kindeId: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

/**
 * DTO for fetching account by kindeId path parameter
 */
export class AccountParamDto {
    @IsNotEmpty()
    @IsString()
    kindeId: string;
}


export class UpdateAccountDto {
    @IsOptional()
    @IsString()
    contact?: string;

    @IsOptional()
    @IsString()
    fullName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}
