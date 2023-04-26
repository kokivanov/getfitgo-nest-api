import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { UserCredentials } from './userCredentials.dto';
import { ApiProperty } from '@nestjs/swagger';

export class loginUserDto extends UserCredentials{

    @ApiProperty({
        type: String,
        description: "User's password."
    })
    @IsString()
    @IsNotEmpty({message: "Must provide a password to login."})
    @MinLength(8)
    @MaxLength(4096)
    password: string
}