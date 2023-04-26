import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";


export class UserCredentials {
    @ApiPropertyOptional({
        type: String,
        description: "ID of user, provided to login"
    })
    @ValidateIf((o: UserCredentials) => {return (o.phone_number == null && o.email == null && o.user_name == null)})
    @IsString()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    id?: string

    @ApiPropertyOptional({
        type: String,
        description: "Username of user, provided to login"
    })
    @ValidateIf((o: UserCredentials) => {return (o.phone_number == null && o.email == null && o.id == null)})
    @IsString()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    user_name?: string
    
    @ApiPropertyOptional({
        type: String,
        description: "phone number of user, provided to login"
    })
    @ValidateIf((o: UserCredentials) => {return (o.user_name == null && o.email == null && o.id == null)})
    @IsPhoneNumber()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    @MinLength(10)
    @MaxLength(15)
    phone_number?: string

    @ApiPropertyOptional({
        type: String,
        description: "E-mail of user, provided to login"
    })
    @ValidateIf((o: UserCredentials) => {return (o.phone_number == null && o.user_name == null && o.id == null)})
    @IsEmail()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    @MinLength(8)
    @MaxLength(320)
    email?: string
}