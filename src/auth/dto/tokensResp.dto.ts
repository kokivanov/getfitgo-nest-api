import { UserResponse } from "./user.dto";

export class AuthResponseDto {
    token: string
    refresh_token: string
    user: UserResponse
}