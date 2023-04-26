import { Controller, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpCode, HttpStatus } from '@nestjs/common';
import { GetUser } from 'src/common/';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    
    @UseInterceptors(ClassSerializerInterceptor)
    @HttpCode(HttpStatus.OK)
    @Get('/me')
    async getMe(@GetUser('sub') userId: any){
        return this.userService.getUser(userId)
    }
}
