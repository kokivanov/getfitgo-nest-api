import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { loginUserDto, registerUserDto, RTDto } from './dto';
import { JWT_EXPITE_TIMEOUT } from 'src/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2' 
import { ID } from 'src/common/id.object';
import { subYears } from 'date-fns';
import { UserEntity } from './dto/user.dto';


@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private config: ConfigService, private prisma: PrismaService){}
    
    private worker_id = this.config.get('WORKER_ID') != null? this.config.get('WORKER_ID') : 0
    private inc = 0

    async register(userDto: registerUserDto) {
        const uID = new ID(Date.now(), this.worker_id, 0, this.inc++);
        const hash = await argon.hash(userDto.password);
        
        if (new Date(userDto.birthday) < subYears(new Date(), 120) || new Date(userDto.birthday) > subYears(new Date(), 3)) throw new BadRequestException("You must be at least 3 years old or younger than 120")
        
        const user = await this.prisma.user.create({
            data: {
                id: uID.value,
                user_name: userDto.user_name,
                email: userDto.email,
                hash: hash,
                phone_number: userDto.phone_number,
                birthday: new Date(userDto.birthday)
            }
        })

        const a = new UserEntity(user)

        return a
    }

    async login(userDto: loginUserDto) {
        
    }

    async logout() {
        
    }

    async refresh(RTDto: RTDto) {
        
    }

    async signToken(userID: BigInt, email: string) {
        const payload = {
            sub: userID,
            email,
        }

        return await this.jwt.signAsync(payload,
            {
                expiresIn: JWT_EXPITE_TIMEOUT,
                secret: this.config.get('JWT_SECRET')
            }
        );
    }
}
