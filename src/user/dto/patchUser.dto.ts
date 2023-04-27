import { ApiPropertyOptional } from '@nestjs/swagger';

export class PatchUserDto {

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
    preferred_country?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    preferred_city?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    current_country?: bigint
    @ApiPropertyOptional({
        type: String,
    })
    current_city?: bigint

    @ApiPropertyOptional({
        type: Number,
    })
    public_fields?: number
}