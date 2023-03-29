import {IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsDate} from 'class-validator'

export class registerUserDto {
    @IsEmail()
    @IsNotEmpty({message: "Must provide an e-mail to register."})
    @MinLength(8)
    @MaxLength(320)
    email: string
    @IsString()
    @IsNotEmpty({message: "Must provide a password to register."})
    @MinLength(8)
    @MaxLength(4096)
    password: string
    @IsString()
    @IsNotEmpty({message: "Must provide an nickname to register."})
    @MinLength(8)
    @MaxLength(256)
    nickname: string
    @IsPhoneNumber()
    @IsNotEmpty({message: "Must provide an phone number to register."})
    @MinLength(8)
    @MaxLength(256)
    phone_number: string
    @IsDate()
    @IsNotEmpty({message: "Must provide an date of birth to register."})
    @MinLength(8)
    @MaxLength(256)
    birthday: string
}