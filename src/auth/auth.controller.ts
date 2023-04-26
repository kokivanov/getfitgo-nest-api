import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { loginUserDto, registerUserDto } from './dto/';
import { AuthService } from './auth.service';
import { Public, JwtGuardRt, JwtGuard, GetUser } from '../common'
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Public()
    @Get()
    async getRoutes(@Req() req: Request) {
        const base = req.protocol + req.get('Host')
        
        return {"Public gateways": [
            base + "/local/register",
            base + "/local/login",
        ]}
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('/local/register')
    async registerLocal(@Body() dto: registerUserDto){
        return await this.authService.registerLocal(dto)
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('/local/login')
    async loginLocal(@Body() dto: loginUserDto) {
        return await this.authService.loginLocal(dto)
    }
    
    @UseGuards(JwtGuardRt)
    @HttpCode(HttpStatus.CREATED)
    @Post('/refresh')
    async refresh(@GetUser() payload: any) {
        return await this.authService.refresh({ id: payload.sub, rt_token: payload.rt_token, exp: payload.exp})
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logout')
    async logout(@GetUser('sub') userId: string) {
        return await this.authService.logout(userId)
    }

}
