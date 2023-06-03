import { ApiProperty } from "@nestjs/swagger"

export class paginationMeta {
    @ApiProperty()
    page: number
    @ApiProperty()
    count: number
    @ApiProperty()
    per_page: number
    @ApiProperty()
    next_page: number
}