import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "process";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env['JWT_SECRET_RT'],
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: any) {
        const rt_token = req.get('authorization').replace('Bearer', '').trim()
        return {...payload, rt_token}
    }
}