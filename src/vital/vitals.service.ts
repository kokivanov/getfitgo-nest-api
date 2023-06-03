import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentType, ID } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { VitalsEntity } from '../common/abs/vitals.object';
import { vitalsDto } from './dto';

@Injectable()
export class VitalsService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    private worker_id = this.config.get('WORKER_ID', 0)

    
    async createVitals(userId : string, dto : vitalsDto) : Promise<VitalsEntity> {
        var cnt = 0
        const id = new ID(Date.now() + cnt, this.worker_id, ContentType.Vitals)

        try {
            const res = await this.prisma.vital.create({
                data: {
                    id : id.value,
                    author_id : BigInt(userId),
                    ...dto
                }
            })
            return new VitalsEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2003') throw new ForbiddenException()
            }
            throw e
        }
    }

    async getVitals(userId : string, id : string) {
        try {
            const res = await this.prisma.vital.findUniqueOrThrow({where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})

            return new VitalsEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') throw new ForbiddenException()
            }
        }

    }


    async editVitals(userId : string, id : string, dto : Partial<vitalsDto>) {
        try {
            const res = await this.prisma.vital.update({data: {
                ...dto
            }, where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})
            if (!res) throw new ForbiddenException()
            return new VitalsEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2003') throw new ForbiddenException()
            }
            throw e
        }
    }

    async deleteVitals(userId : string, id : string){
        try{
            const res = await this.prisma.vital.delete({where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})
            if (!res) throw new ForbiddenException()

            return new VitalsEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                throw new NotFoundException()
            }
            throw e
        }
    }

 }