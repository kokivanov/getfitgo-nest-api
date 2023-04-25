import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "process";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env['JWT_SECRET_RT']
        })
    }

    validate(payload: any) {
        return payload
    }
}