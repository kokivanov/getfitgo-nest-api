import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true}), PrismaModule],
})
export class AppModule {}
