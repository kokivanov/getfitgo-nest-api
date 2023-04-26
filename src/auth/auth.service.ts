import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { loginUserDto, registerUserDto, RTDto } from './dto';
import { JWT_EXPITE_TIMEOUT, JWT_REFRESH_EXPITE_TIMEOUT } from 'src/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2' 
import { ID } from '../common/abs/id.object';
import { subYears } from 'date-fns';
import { UserResponse } from './dto/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private config: ConfigService, private prisma: PrismaService, private uservice: UserService){}
    
    private worker_id = this.config.get('WORKER_ID', 0)


    async registerLocal(userDto: registerUserDto) {
        if (new Date(userDto.birthday) < subYears(new Date(), 120) || new Date(userDto.birthday) > subYears(new Date(), 3)) throw new BadRequestException("You must be at least 3 years old or younger than 120")
        
        const uID = new ID(Date.now(), this.worker_id, 0);
        const hash = await this.hashString(userDto.password)
        const tokens = await this.signTokens(uID.value, userDto.email)
        const hashRt = await argon.hash(tokens.refresh_token);
        const user = await this.createUser(userDto, uID, hash, hashRt);
        const a = new UserResponse(user);

        return {...tokens, user: {...a}};
    }

    async loginLocal(userDto: loginUserDto) {
        try{
            const user = await this.uservice.findUser(userDto)
            if(!await argon.verify(user.hash, userDto.password)) throw new ForbiddenException({message : "Invalid credentials"})

            const tokens = await this.signTokens(user.id, user.email)

            const a = new UserResponse(user);
            return { ...tokens, user: { ...a } }
        } catch (e) {
            if (e instanceof NotFoundException) throw new ForbiddenException({message : "Invalid credentials"})
            throw e
        }
        
    }
    
    async logout(userID : string) {
        await this.prisma.user.update({ where: { id: BigInt(`${userID}`) }, data: { hashedRt : null}})
    }

    async refresh(RTDto: RTDto) {
        const user = (await this.prisma.user.findUnique({where: {id: BigInt(`${RTDto.id}`)}, select : {hashedRt: true, email: true}}))
        
        if (!(await argon.verify(user.hashedRt, RTDto.rt_token))) throw new ForbiddenException({message: "Refresh token is invalid."})
        return await this.signTokens(RTDto.id, user.email)
    }

    async hashString(data: string) {
        return await argon.hash(data);
    }

    async makeToken(payload: any, expires: number, secret: string){
        return await this.jwt.signAsync(payload,
            {
                expiresIn: expires,
                secret: secret
            }
        )
    }

    async signTokens(userID: string | bigint, email: string) {
        const payload = {
            sub: userID.toString(),
            email,
        }
         
        const [at, rt] = [
            await this.makeToken(payload, JWT_EXPITE_TIMEOUT, this.config.get('JWT_SECRET')),
            await this.makeToken(payload, JWT_REFRESH_EXPITE_TIMEOUT, this.config.get('JWT_SECRET_RT'))
        ]

        await this.updateRtHash(BigInt(`${userID}`), rt)

        return {
            token: at,
            refresh_token: rt,
        }
    }

    private async updateRtHash(userID: bigint, rt: string){
        const hash = await this.hashString(rt)
        
        await this.prisma.user.update({
            where: { id: userID },
            data: { hashedRt: hash }
        })
    }

    private async createUser(userDto : registerUserDto, uID : ID, hash : string, hashRt : string) {
        try {
            return await this.prisma.user.create({
                data: {
                    id: uID.value,
                    user_name: userDto.user_name,
                    email: userDto.email,
                    hash: hash,
                    hashedRt: hashRt,
                    phone_number: userDto.phone_number,
                    birthday: new Date(userDto.birthday)
                }
            })
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2002') {
                    throw new BadRequestException({
                        message: `User with this ${Array(e.meta.target).join(' ')} already exist! Please log in.`
                    })
                } else if (e.code == 'P2006') {
                    throw new BadRequestException({
                        message: `Invalid type of ${e.meta.target}!`
                    })
                } else if (e.code == 'P2011'){
                    throw new BadRequestException({
                        message: `${e.meta.target} can't be null!`
                    })
                }
            
                throw e
            }

            throw e
        } 
    }
}
