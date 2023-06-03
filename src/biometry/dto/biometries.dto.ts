import { ApiProperty } from "@nestjs/swagger";
import { biometryDto } from "./biometry.dto";
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class biometriesDto {
    @ApiProperty({
        type: [biometryDto]
    })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @Type(() => biometryDto)
    @ValidateNested({each: true})
    data: biometryDto[]
}