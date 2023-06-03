import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { loginUserDto, registerUserDto } from './dto/';
import { AuthService } from './auth.service';
import { Public, JwtGuardRt, JwtGuard, GetUser, Tokens, RequestSuccessDescription, RequestReturnsDescription } from '../common';
import { Request } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenizedUserEntity } from 'src/common/abs/tokenizedUser.dto';

@ApiTags('Auth')
@Controller({
    path: 'auth',
    version: ['1']
})
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOkResponse({
        description: RequestReturnsDescription.AuthGatewaysResponse,
        schema: { 
            example: {
                "Public authorization gateways": [
                    "https://www.example.com/local/register",
                    "https://www.example.com/local/login",
                ]
            }
        }
    })
    @Public()
    @Get()
    async getRoutes(@Req() req: Request) {
        const base = req.protocol + '://' + req.get('Host');

        return {
            "Public authorization gateways": [
                base + "/local/register",
                base + "/local/login",
            ]
        };
    }

    @ApiCreatedResponse({
        description: RequestReturnsDescription.RegisterReturn,
        type: TokenizedUserEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('/local/register')
    async registerLocal(@Body() dto: registerUserDto) {
        return await this.authService.registerLocal(dto);
    }

    @ApiCreatedResponse({
        description: RequestReturnsDescription.LoginReturn,
        type: TokenizedUserEntity
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('/local/login')
    async loginLocal(@Body() dto: loginUserDto) {
        return await this.authService.loginLocal(dto);
    }

    @ApiBearerAuth()
    @ApiOkResponse({
        description: RequestReturnsDescription.RefreshReturn,
        type: Tokens
    })
    @Public()
    @UseGuards(JwtGuardRt)
    @HttpCode(HttpStatus.CREATED)
    @Post('/refresh')
    async refresh(@GetUser() payload: any) {
        return await this.authService.refresh({ id: payload.sub, rt_token: payload.rt_token, exp: payload.exp });
    }

    @ApiBearerAuth()
    @ApiOkResponse({
        description: RequestSuccessDescription.LogOutResponse,
        type: null
    })
    @HttpCode(HttpStatus.OK)
    @Post('/logout')
    async logout(@GetUser('sub') userId: string) {
        return await this.authService.logout(userId);
    }

}
