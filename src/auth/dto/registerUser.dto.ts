import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, Matches, Min, Max, IsNumber, IsDate, isString, IsDateString } from 'class-validator';

export class registerUserDto {
    @ApiPropertyOptional({
        type: String,
        description: "E-mail of user, provided to register"
    })
    @IsEmail()
    @IsNotEmpty({message: "Must provide an e-mail to register."})
    @MinLength(8)
    @MaxLength(360)
    email: string

    @ApiPropertyOptional({
        type: String,
        description: "Password of user, provided to register"
    })
    @IsNotEmpty({message: "Must provide a password to register."})
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])?(?=.*\d)(?=.*[@$!%*?&])?[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password must contain minimum eight characters, it cant be only letters or only numbers'})
    @MinLength(8)
    @MaxLength(4096)
    password: string

    @ApiPropertyOptional({
        type: String,
        description: "User's nickname, provided to register"
    })
    @IsNotEmpty({message: "Must provide an nickname to register."})
    @IsString()
    @MinLength(3)
    @MaxLength(32)
    user_name: string

    @ApiPropertyOptional({
        type: String,
        description: "E-mail of user, provided to register"
    })
    @IsNotEmpty({message: "Must provide an phone number to register."})
    @IsPhoneNumber()
    @MinLength(10)
    @MaxLength(15)
    phone_number: string
    
    @ApiPropertyOptional({
        type: String,
        description: "Birtday date of user, represented as ISO8601 string, provided to register",
        example: "2023-04-26T12:13:09.957Z"
    })
    @IsDateString()
    @IsNotEmpty({message: "Must provide an date of birth to register."})
    birthday: string
}