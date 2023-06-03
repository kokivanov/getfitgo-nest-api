import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsNumberString, IsOptional } from "class-validator";


export class biometryDto {
    @ApiProperty({
        type: Number
    })
    @Transform((v) => parseInt(v.value))
    @IsNumber()
    @IsOptional()
    weight? : number 
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @Transform((v) => parseInt(v.value))
    @IsNumber()
    height? : number 
    @ApiProperty({
        type: Number
    })
    @IsOptional()
    @Transform((v) => parseInt(v.value))
    @IsNumberString()
    fat_percent? : number
    @ApiProperty({
        type: Boolean
    })
    @IsOptional()
    @Transform((v) => JSON.parse(v.value))
    @IsBoolean()
    is_public? : boolean
}