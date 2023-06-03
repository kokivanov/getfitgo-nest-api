import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class patchUserDto {

    @ApiPropertyOptional({
        type: String,
    })
    user_name?: string
    @ApiPropertyOptional({
        type: String,
    })
    phone_number?: string
    @ApiPropertyOptional({
        type: Date,
    })
    birthday?: Date
    @ApiPropertyOptional({
        type: String,
    })
    first_name?: string 
    @ApiPropertyOptional({
        type: String,
    })
    last_name?: string
    @ApiPropertyOptional({
        type: String,
    })
    middle_name?: string
    
    @ApiPropertyOptional({
        type: String,
        description: "User's profile description (biography)."
    })
    bio?: string | null

    @ApiPropertyOptional({
        type: String,
    })
    preferred_country_id?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    preferred_city_id?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    current_country_id?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    current_city_id?: bigint

    @ApiPropertyOptional({
        type: Number,
    })
    public_fields?: number

    @ValidateIf((o: patchUserDto) => !(o.bio != '' || o.birthday || o.current_city_id || o.current_country_id || o.first_name || o.last_name || o.middle_name || o.phone_number || o.preferred_city_id || o.preferred_country_id || o.public_fields || o.user_name))
    @IsNotEmpty({message: "Must provide at least one of optional fields!"})
    a: boolean
}