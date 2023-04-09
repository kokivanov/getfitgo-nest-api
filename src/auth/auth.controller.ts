import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { UserEntity, loginUserDto, registerUserDto } from './dto/';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('/local/register')
    async register(@Req() req, @Body() dto: registerUserDto){
        return await this.authService.register(dto)
    }

    @Post('/local/login')
    async login(@Body() dto: loginUserDto) {

        return await this.authService.login(dto)
    }

    @Post('/refresh')
    async refresh() {

    }

    @Post('/logout')
    async logout() {

    }

}
