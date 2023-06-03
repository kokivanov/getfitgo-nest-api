import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class JournalEntity {
    @ApiProperty({
        type: String
    })
    @Transform((v) => v.value.toString())
    id : BigInt
    @ApiProperty({
        type: String
    })
    @Transform((v) => v.value.toString())
    author_id : BigInt
    @ApiProperty({
        type: Date
    })
    created_at : Date
    @ApiProperty({
        type: Number
    })
    calories_consumed? : number
    @ApiProperty({
        type: Number
    })
    calories_burned? : number
    @ApiProperty({
        type: Number
    })
    protein_consumed? : number
    @ApiProperty({
        type: Boolean
    })
    is_public : boolean

    constructor(partial: Partial<JournalEntity>) {
        Object.assign(this, partial)
    }
}