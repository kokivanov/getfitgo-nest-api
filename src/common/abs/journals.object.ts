import { Type } from "class-transformer";
import { JournalEntity } from "./journal.object";
import { paginationMeta } from "./paginationMeta";
import { Journal } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class JournalsEntity{
    @ApiProperty({
        type: [JournalEntity]
    })
    @Type(() => JournalEntity)
    data: Array<JournalEntity> | Array<Journal>
    @ApiProperty({
        type: paginationMeta
    })
    meta: paginationMeta

    constructor(partial: Partial<JournalsEntity>) {
        Object.assign(this, partial)
    }
}