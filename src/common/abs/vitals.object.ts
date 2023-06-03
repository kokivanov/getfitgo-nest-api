import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class VitalsEntity {
    @ApiProperty({
        type: String
    })
    @Transform((v) => v.value.toString())
    id: bigint
    @ApiProperty({
        type: String
    })
    @Transform((v) => v.value.toString())
    author_id: bigint
    @ApiProperty({
        type: Date
    })
    created_at: Date
    @ApiPropertyOptional({
        type: Number
    })
    heartbeat?: number
    @ApiPropertyOptional({
        type: Number
    })
    pressure?: number
    @ApiPropertyOptional({
        type: Number
    })
    o2level?: number
    @ApiProperty({
        type: Boolean
    })
    is_public: boolean

    constructor(partial: Partial<VitalsEntity>) {
        Object.assign(this, partial)
    }
}