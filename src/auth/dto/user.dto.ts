import { User } from "@prisma/client";
import { Exclude, Transform, Type } from "class-transformer";

export class UserEntity {
    @Type(() => Number)
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    id: number | bigint
    reg_timestamp: Date
    email: string
    user_name: string
    phone_number: string
    birthday: Date
    first_name: string | null
    last_name: string | null
    middle_name: string | null

    @Exclude()
    hash: string
    @Exclude()
    hashedRt: string | null
    
    roleId: number | null | bigint
    is_subscribed: boolean
    score: number
    bio: string | null
    @Type(() => Number)
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    preferred_country_id: number | null | bigint
    @Type(() => Number)
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    preferred_city_id: number | null | bigint
    @Type(() => Number)
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    current_country_id: number | null | bigint
    @Type(() => Number)
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    current_city_id: number | null | bigint
    public_fields: number
    metadata: Buffer | null
    updated_at: Date

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
        this.current_city_id = Number(partial.current_city_id)
        this.current_country_id = Number(partial.current_country_id)
        this.preferred_city_id = Number(partial.preferred_city_id)
        this.preferred_country_id = Number(partial.preferred_country_id)
        this.id = Number(partial.id)
    }
}