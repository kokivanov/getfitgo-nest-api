import { Controller } from '@nestjs/common';
import { loginUserDto, registerUserDto } from './dto/';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    async register(dto: registerUserDto) {
        return this.authService.register(dto)
    }

    async login(dto: loginUserDto) {
        return this.authService.authorize(dto)
    }

}
