import { VitalModule } from './vital/vitals.module';
import { JournalModule } from './journal/journal.module';
import { BiometryModule } from './biometry/biometry.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    VitalModule,
    JournalModule,
    BiometryModule, AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, BiometryModule, VitalModule],
})
export class AppModule { }
