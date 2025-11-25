import { IsEmail, IsNotEmpty } from "class-validator";

//  to support class validation  we need to change these interfaces to classes
export class CreateAccountDto {
    @IsNotEmpty()
    kindeId: string;
}

export class UpdateAccountDto {
    @IsNotEmpty()
    kindeId: string;
}
