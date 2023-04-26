import { ApiProperty } from '@nestjs/swagger';
export class Tokens{
    @ApiProperty({
        description: "Your access token.",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzY0MTY3NTE1MTUxMjY5ODg4IiwiaWF0IjoxNjgyNTEwMDcwLCJleHAiOjE2ODI1MTA5NzB9.tqCZN3PYsim0RKsN8N9rcyBFd_-29iIP9VlBXQjIlEw"
    })
    token: string
    @ApiProperty({
        description: "Your refresh token to renew access token.",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzY0MTY3NTE1MTUxMjY5ODg4IiwiaWF0IjoxNjgyNTEwMDcwLCJleHAiOjE2ODI1OTY0NzB9.QjIJK-lV_MdAFsPT_iAjVXI9OH-R4BTIA7n_Sk6ADg4"
    })
    refresh_token: string

    constructor(partial: Partial<Tokens>) {
        Object.assign(this, partial)
    }
}