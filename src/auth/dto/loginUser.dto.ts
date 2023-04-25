import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { UserCredentials } from './userCredentials.dto';

export class loginUserDto extends UserCredentials{

    @IsString()
    @IsNotEmpty({message: "Must provide a password to login."})
    @MinLength(8)
    @MaxLength(4096)
    password: string
}