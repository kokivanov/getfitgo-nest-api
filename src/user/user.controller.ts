import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, HttpCode, HttpStatus } from '@nestjs/common';
import { GetUser, RequestErrorDescriptions, RequestReturnsDescription, UserEntity } from 'src/common/';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller({
    path: 'user',
    version: ['1']
})
export class UserController {
    constructor(private userService : UserService, private prisma: PrismaService) {}

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
    async getMe(@GetUser('sub') userId: any){
        return this.userService.getUser(userId)
    }
}
