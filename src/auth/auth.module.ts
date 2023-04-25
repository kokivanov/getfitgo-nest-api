import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
