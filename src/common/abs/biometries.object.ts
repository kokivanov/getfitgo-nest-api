import { Type } from "class-transformer";
import { BiometryEntity } from "./biometry.object";
import { paginationMeta } from "./paginationMeta";
import { Biometry } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class BiometriesEntity{
    @ApiProperty({
        type: [BiometryEntity]
    })
    @Type(() => BiometryEntity)
    data: Array<BiometryEntity> | Array<Biometry>
    @ApiProperty({
        type: paginationMeta
    })
    meta: paginationMeta

    constructor(partial: Partial<BiometriesEntity>) {
        Object.assign(this, partial)
    }
}