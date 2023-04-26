import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuardRt extends AuthGuard('jwt-rt') {
    constructor() {
        super()
    }
}