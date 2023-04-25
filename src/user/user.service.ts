import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserCredentials } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/common/abs';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUser(userID : string): Promise<UserEntity> {
        return new UserEntity(await this.findUser({id: userID}));
    }

    async findUser(userDto : Partial<UserCredentials>) {
        try {
            if (userDto.id != null) return await this.prisma.user.findUniqueOrThrow({where: {id : BigInt(`${userDto.id}`)}, include: {currentCity: true, currentCountry: true, preferredCity: true, preferredCountry: true, role: true}})
            else if (userDto.email != null) return await this.prisma.user.findUniqueOrThrow({where: {email : userDto.email}, include: {currentCity: true, currentCountry: true, preferredCity: true, preferredCountry: true, role: true}})
            else if (userDto.user_name != null) return await this.prisma.user.findUniqueOrThrow({where: {user_name: userDto.user_name}, include: {currentCity: true, currentCountry: true, preferredCity: true, preferredCountry: true, role: true}})
            else if (userDto.phone_number != null) return await this.prisma.user.findUniqueOrThrow({where: {phone_number: userDto.phone_number}, include: {currentCity: true, currentCountry: true, preferredCity: true, preferredCountry: true, role: true}})
            else throw new BadRequestException({message: "Must provide either id, email, phone or user name to find one."})
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') throw new NotFoundException({message: "Can't find user with provided information."})
                throw e
            }

            throw e
        }
    }
}
