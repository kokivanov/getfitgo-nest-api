import { PrismaModule } from 'src/prisma/prisma.module';
import { BiometryService } from './biometry.service';
import { Module } from '@nestjs/common';
import { BiometryController } from './biometry.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthorityGuard } from 'src/common';

@Module({
    imports: [PrismaModule],
    controllers: [BiometryController],
    providers: [
        BiometryService,],
})
export class BiometryModule { }
