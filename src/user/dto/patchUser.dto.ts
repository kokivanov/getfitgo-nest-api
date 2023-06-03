import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateIf } from 'class-validator';

export class patchUserDto {

    @ApiPropertyOptional({
        type: String,
    })
    @IsString()
    @IsOptional()
    user_name?: string
    @ApiPropertyOptional({
        type: String,
    })
    @IsString()
    @IsOptional()
    phone_number?: string
    @ApiPropertyOptional({
        type: Date,
    })
    @IsString()
    @IsOptional()
    birthday?: Date
    @ApiPropertyOptional({
        type: String,
    })
    @IsString()
    @IsOptional()
    first_name?: string 
    @ApiPropertyOptional({
        type: String,
    })
    @IsString()
    @IsOptional()
    last_name?: string
    @ApiPropertyOptional({
        type: String,
    })
    @IsString()
    @IsOptional()
    middle_name?: string
    
    @ApiPropertyOptional({
        type: String,
        description: "User's profile description (biography)."
    })
    @IsString()
    @IsOptional()
    bio?: string | null

    @ApiPropertyOptional({
        type: String,
    })
    @IsNumberString()
    @IsOptional()
    preferred_country_id?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    @IsNumberString()
    @IsOptional()
    preferred_city_id?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    @IsNumberString()
    @IsOptional()
    current_country_id?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    @IsNumberString()
    @IsOptional()
    current_city_id?: bigint

    @ApiPropertyOptional({
        type: Number,
    })
    @IsInt()
    public_fields?: number

    @ValidateIf((o: patchUserDto) => !(o.bio != '' || o.birthday || o.current_city_id || o.current_country_id || o.first_name || o.last_name || o.middle_name || o.phone_number || o.preferred_city_id || o.preferred_country_id || o.public_fields || o.user_name))
    @IsNotEmpty({message: "Must provide at least one of optional fields!"})
    a: boolean
}