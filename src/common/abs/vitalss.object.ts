import { Type } from "class-transformer";
import { paginationMeta } from "./paginationMeta";
import { Biometry } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { VitalsEntity } from "./vitals.object";

export class VitalssEntity{
    @ApiProperty({
        type: [VitalsEntity]
    })
    @Type(() => VitalsEntity)
    data: Array<VitalsEntity> | Array<Biometry>
    @ApiProperty({
        type: paginationMeta
    })
    meta: paginationMeta

    constructor(partial: Partial<VitalssEntity>) {
        Object.assign(this, partial)
    }
}