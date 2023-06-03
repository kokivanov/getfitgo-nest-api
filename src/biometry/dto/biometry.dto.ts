import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";


export class biometryDto {
    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    weight? : number 
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    height? : number 
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    fat_percent? : number
    @ApiProperty({
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    is_public? : boolean
}