import { Role } from ".prisma/client";
import { Exclude, Transform } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    
    @ApiProperty({
        type: String,
        description: "Represented as string, but its 64-bit unsigned integer that represents user ID, it contains information when entity was created, in which conteiner and entity's cpontent type.",
        example: "1764159065918799872"
    })
    @Transform(({ value }) => value.toString())
    id: bigint | string
    @ApiProperty({
        type: Date,
        description: "Registration timestamp"
    })
    reg_timestamp: Date
    @ApiProperty({
        type: String,
    })
    email: string
    @ApiProperty({
        type: String,
    })
    user_name: string
    @ApiProperty({
        type: String,
    })
    phone_number: string
    @ApiProperty({
        type: Date,
    })
    birthday: Date
    @ApiProperty({
        type: String,
    })
    first_name: string 
    @ApiProperty({
        type: String,
    })
    last_name: string
    @ApiProperty({
        type: String,
    })
    middle_name: string

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

    @ApiProperty({
        type: String,
    })
    @Transform(({ value }) => value.name)
    role: Role
    
    @ApiProperty({
        type: Boolean,
    })
    is_subscribed: boolean
    @ApiProperty({
        type: Number,
    })
    score: number
    @ApiProperty({
        type: String,
        description: "User's profile description (biography)."
    })
    bio: string | null

    @ApiProperty({
        type: String,
    })
    @Transform(({ value }) => value.name)
    preferred_country: string | bigint | null
    @ApiProperty({
        type: String,
    })
    @Transform(({ value }) => value.name)
    preferred_city: string | bigint | null
    @ApiProperty({
        type: String,
    })
    @Transform(({ value }) => value.name)
    current_country: string | bigint | null
    @ApiProperty({
        type: String,
    })
    @Transform(({ value }) => value.name)
    current_city: string | bigint | null

    @ApiProperty({
        type: Number,
    })
    public_fields: number
    @ApiProperty({
        type: Buffer,
        description: "JSON-encoded data with rarely used values."
    })
    metadata: Buffer

    @Exclude()
    updated_at: Date

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}