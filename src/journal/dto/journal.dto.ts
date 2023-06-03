import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class journalDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    calories_consumed? : number
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    calories_burned? : number
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    protein_consumed? : number
    @ApiPropertyOptional({
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    is_public? : boolean
}