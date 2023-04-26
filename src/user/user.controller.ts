import { Controller, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpCode, HttpStatus } from '@nestjs/common';
import { Authorities, Authority, GetUser, UserEntity } from 'src/common/';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthorityGuard } from '../common';
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
        description: "Returns object of currently loged in user."
    })
    @ApiUnauthorizedResponse({
        description: "Perhaps your access oke expired or corrupted."
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    @Get('/me')
    async getMe(@GetUser('sub') userId: any){
        return this.userService.getUser(userId)
    }
}
