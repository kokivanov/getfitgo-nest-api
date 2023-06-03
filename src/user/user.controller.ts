import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, HttpCode, HttpStatus, Patch, Body, Req, Post } from '@nestjs/common';
import { GetBody, GetUser, RequestErrorDescriptions, RequestReturnsDescription, UserEntity } from 'src/common/';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { patchUserDto } from './dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller({
    path: 'user',
    version: ['1']
})
export class UserController {
    constructor(private userService : UserService) {}

    @ApiOkResponse({
        type: UserEntity,
        description: RequestReturnsDescription.GetMeResponse
    })
    @ApiUnauthorizedResponse({
        description: RequestErrorDescriptions.ExpiredToken
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    @Get('/me')
    async getMe(@GetUser('sub') userId: string){
        return this.userService.getUser(userId)
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Post('/me')
    async patchMe(@GetUser('sub') userId: any, @Body() dto: patchUserDto){
        return this.userService.patchUser(userId, dto)
    }
}
