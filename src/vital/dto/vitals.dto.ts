import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class vitalsDto {
    @IsOptional()
    @IsNumber()
    heartbeat? : number
    @IsOptional()
    @IsNumber()
    pressure? : number
    @IsOptional()
    @IsNumber()
    o2level? : number
    @IsOptional()
    @IsBoolean()
    is_public? : boolean
}