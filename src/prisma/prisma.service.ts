import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Authorities } from 'src/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private config: ConfigService){
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async onModuleInit() {
        await this.$connect();
        
        try {
            await this.role.create({data:{
                name: "User",
                id: 0,
                description: "Basic role for every new user"
            }});
        } catch {}

        //TODO: REMOVE
        try {
            await this.role.create({data:{
                name: "Superuser",
                id: 1,
                description: "Superuser role",
                priviligiles: Authorities.ALL
            }});
        } catch {
        }
    }
}
