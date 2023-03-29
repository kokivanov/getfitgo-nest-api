import {IsEmail, IsString, IsNotEmpty, MinLength, MaxLength} from 'class-validator'

export class loginUserDto {
    @IsEmail()
    @IsNotEmpty({message: "Must provide an e-mail to authorize."})
    @MinLength(8)
    @MaxLength(320)
    email: string
    @IsString()
    @IsNotEmpty({message: "Must provide a password to authorize."})
    @MinLength(8)
    @MaxLength(4096)
    password: string
}