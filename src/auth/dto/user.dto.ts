export class UserResponse {
    id: string | bigint
    reg_timestamp: Date
    email: string
    user_name: string
    phone_number: string
    birthday: Date
    first_name: string | null
    last_name: string | null
    middle_name: string | null

    hash: string
    hashedRt: string | null
    
    roleId: number | null
    is_subscribed: boolean
    score: number
    bio: string | null
    preferred_country: number | null | bigint
    preferred_city: number | null | bigint
    current_country: number | null | bigint
    current_city: number | null | bigint
    public_fields: number
    metadata: Buffer | null
    updated_at: Date

    constructor(partial: any) {
        this.id = partial.id ? partial.id : null
        this.reg_timestamp = partial.reg_timestamp ? partial.reg_timestamp : null
        this.email = partial.email ? partial.email : null
        this.user_name = partial.user_name ? partial.user_name : null
        this.phone_number = partial.phone_number ? partial.phone_number : null
        this.birthday = partial.birthday ? partial.birthday : null
        this.first_name = partial.first_name ? partial.first_name : null
        this.last_name = partial.last_name ? partial.last_name : null
        this.middle_name = partial.middle_name ? partial.middle_name : null
        this.roleId = partial.roleId ? partial.roleId : null
        this.is_subscribed = partial.is_subscribed ? partial.is_subscribed : null
        this.score = partial.score ? partial.score : null
        this.bio = partial.bio ? partial.bio : null
        this.public_fields = partial.public_fields ? partial.public_fields : null
        this.current_city = partial.current_city ? Number(partial.current_city) : null
        this.current_country = partial.current_country ? Number(partial.current_country) : null
        this.preferred_city = partial.preferred_city ? Number(partial.preferred_city) : null
        this.preferred_country = partial.preferred_country ? Number(partial.preferred_country) : null
        this.id = partial.id ? `${partial.id}` : null
        this.metadata = partial.metadata ? partial.metadata : null
        this.updated_at = partial.updated_at ? partial.updated_at : null
    }
}