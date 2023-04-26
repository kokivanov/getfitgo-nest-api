import { Role } from ".prisma/client";
import { Exclude, Transform, Type, classToPlain } from "class-transformer";
import { UserEntity } from "./user.object";
import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from "./tokens.object";

export class TokenizedUserEntity extends Tokens {
    @ApiProperty({
        type: UserEntity,
        description: "Object that represents user"
    })
    @Type(() => UserEntity)
    user: UserEntity

    constructor(partial: Partial<TokenizedUserEntity>) {
        super(partial)
        Object.assign(this, partial)
    }
}