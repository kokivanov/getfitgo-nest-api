import { Controller, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/common/decorators';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/me')
    async getMe(@GetUser('sub') userId: any){
        return this.userService.getUser(userId)
    }
}
