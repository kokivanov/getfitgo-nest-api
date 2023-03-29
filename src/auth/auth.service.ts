import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { loginUserDto, registerUserDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private config: ConfigService){}

    async register(userDto: registerUserDto) {
        
    }

    async authorize(userDto: loginUserDto) {

    }

    async signToken(userID: number, email: string) {
        const payload = {
            sub: userID,
            email,
        }

        return await this.jwt.signAsync(payload,
            {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET')
            }
        );
    }
}
