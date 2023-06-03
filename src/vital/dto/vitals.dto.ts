import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class vitalsDto {
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    heartbeat? : number
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    pressure? : number
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    o2level? : number
    @ApiProperty({
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    is_public? : boolean
}