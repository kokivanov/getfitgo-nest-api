import {IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, ValidateIf, IsPhoneNumber} from 'class-validator'

export class loginUserDto {

    @ValidateIf((o: loginUserDto) => {return (o.phone_number == null && o.email == null)})
    @IsString()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    @MinLength(8)
    @MaxLength(16)
    user_name?: string
    
    @ValidateIf((o: loginUserDto) => {return (o.user_name == null && o.email == null)})
    @IsPhoneNumber()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    @MinLength(10)
    @MaxLength(15)
    phone_number?: string

    @ValidateIf((o: loginUserDto) => {return (o.phone_number == null && o.user_name == null)})
    @IsEmail()
    @IsNotEmpty({message: "Must provide either e-mail, phone number or nickname to login"})
    @MinLength(8)
    @MaxLength(320)
    email?: string

    @IsString()
    @IsNotEmpty({message: "Must provide a password to login."})
    @MinLength(8)
    @MaxLength(4096)
    password: string
}