import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentType, ID } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JournalEntity, JournalsEntity } from '../common/abs/';
import { journalDto } from './dto';

@Injectable()
export class JournalService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    private worker_id = this.config.get('WORKER_ID', 0)

    
    async createJournal(userId : string, dto : journalDto) {
        var cnt = 0
        const id = new ID(Date.now() + cnt, this.worker_id, ContentType.Journal)

        try {
            const res = await this.prisma.journal.create({
                data: {
                    id : id.value,
                    author_id : BigInt(userId),
                    ...dto
                }
            })
            return new JournalEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2003') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
            throw e
        }
    }

    async getJournal(userId : string, id : string) {
        try {
            const res = await this.prisma.journal.findUniqueOrThrow({where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})

            console.log(res)

            if (!res) throw new ForbiddenException()

            return new JournalEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2025') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
        }

    }

    async getJournals(userId : string, page: number, per_page: number) {
        try {

            const res = await this.prisma.journal.findMany({where: {
                author_id: BigInt(userId)
            }, take: per_page, skip: per_page*(page-1)})

            return new JournalsEntity({data: res, meta: {
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

    async editJournal(userId : string, id : string, dto : Partial<journalDto>) {
        try {
            const res = await this.prisma.journal.update({data: {
                ...dto
            }, where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})
            if (!res) throw new ForbiddenException()
            return new JournalEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2003') throw new ForbiddenException()
                if (e.code == 'P2033') throw new BadRequestException()
            }
            throw e
        }
    }

    async deleteJournal(userId : string, id : string){
        try{
            const res = await this.prisma.journal.delete({where: {
                id_author_id: {id: BigInt(id), author_id: BigInt(userId)}
            }})
            if (!res) throw new ForbiddenException()

            return new JournalEntity(res)
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code == 'P2033') throw new BadRequestException()
                throw new NotFoundException()
            }
            throw e
        }
    }

 }
