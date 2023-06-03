import { Role } from ".prisma/client";
import { Exclude, Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BiometryEntity {
    @ApiProperty({
        type: String,
        description: 'ID of biometry record'
    })
    @Transform((v) => v.value.toString())
    id: BigInt | string
    @ApiProperty({
        type: String,
        description: 'ID of author of biometry record'
    })
    @Transform((v) => v.value.toString())
    author_id: BigInt | string
    @ApiProperty({
        type: Date,
    })
    created_at: Date
    @ApiProperty({
        type: Number
    })
    weight: number
    @ApiProperty({
        type: Number
    })
    height: number
    fat_percent: number
    @ApiProperty({
        type: Boolean
    })
    is_public: Boolean
    @ApiProperty({
        type: Date,
    })
    updated_at: Date

    constructor(partial: Partial<BiometryEntity>) {
        Object.assign(this, partial)
    }
}