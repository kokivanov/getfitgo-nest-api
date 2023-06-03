import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentType, ID } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BiometryEntity, BiometriesEntity } from '../common/abs/';
import { biometryDto } from './dto';

@Injectable()
export class BiometryService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    private worker_id = this.config.get('WORKER_ID', 0)

    
    async createBiometry(userId : string, dto : biometryDto) : Promise<BiometryEntity> {
        var cnt = 0
        const id = new ID(Date.now() + cnt, this.worker_id, ContentType.Biometry)

        try {
            const res = await this.prisma.biometry.create({
                data: {
                    id : id.value,
                    author_id : BigInt(userId),
                    weight: dto.weight,
                    height: dto.height,
                    fat_percent: dto.fat_percent,
                    is_public: dto.is_public
                }
            })
            return new BiometryEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2003') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
            throw e
        }
    }

    async getBiometry(userId : string, id : string) {
        try {
            const res = await this.prisma.biometry.findUniqueOrThrow({where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})

            if (!res) throw new ForbiddenException()

            return new BiometryEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
        }

    }

    async getBiometries(userId : string, page: number, per_page: number) {
        try {

            const res = await this.prisma.biometry.findMany({where: {
                author_id: BigInt(userId)
            }, take: per_page, skip: per_page*(page-1)})

            return new BiometriesEntity({data: res, meta: {
                page: page,
                per_page: per_page,
                count: res.length,
                next_page: res.length == per_page ? page+1 : -1
            }})
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
        }

    }


    async editBiometry(userId : string, id : string, dto : Partial<biometryDto>) {
        try {
            const res = await this.prisma.biometry.update({data: {
                ...dto
            }, where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})
            if (!res) throw new ForbiddenException()
            return new BiometryEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2003') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
            throw e
        }
    }

    async deleteBiometry(userId : string, id : string){
        try{
            const res = await this.prisma.biometry.delete({where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})
            if (!res) throw new ForbiddenException()

            return new BiometryEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2033') throw new BadRequestException()
                throw new NotFoundException()
            }
            throw e
        }
    }

 }
