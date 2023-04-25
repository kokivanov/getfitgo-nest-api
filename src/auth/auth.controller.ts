import { Body, Controller, HttpCode, Post, Req, UseInterceptors } from '@nestjs/common';
import { loginUserDto, registerUserDto } from './dto/';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @HttpCode(201)
    @Post('/local/register')
    async registerLocal(@Body() dto: registerUserDto){
        return await this.authService.registerLocal(dto)
    }

    @HttpCode(201)
    @Post('/local/login')
    async loginLocal(@Body() dto: loginUserDto) {
        return await this.authService.loginLocal(dto)
    }

    @Post('/refresh')
    async refresh() {

    }

    @Post('/logout')
    async logout() {

    }

}
