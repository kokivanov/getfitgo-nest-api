import { Role } from ".prisma/client";
import { Exclude, Transform } from "class-transformer";

export class UserEntity {
    
    @Transform(({ value }) => value.toString())
    id: bigint
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
    @Exclude()
    roleId
    @Exclude()
    preferred_country_id: string | bigint | null
    @Exclude()
    preferred_city_id: string | bigint | null
    @Exclude()
    current_country_id: string | bigint | null
    @Exclude()
    current_city_id: string | bigint | null

    @Transform(({ value }) => value.name)
    role: number | null | Role
    
    is_subscribed: boolean
    score: number
    bio: string | null

    @Transform(({ value }) => value.name)
    preferred_country: string | bigint | null
    @Transform(({ value }) => value.name)
    preferred_city: string | bigint | null
    @Transform(({ value }) => value.name)
    current_country: string | bigint | null
    @Transform(({ value }) => value.name)
    current_city: string | bigint | null

    public_fields: number
    metadata: Buffer | null
    updated_at: Date

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}