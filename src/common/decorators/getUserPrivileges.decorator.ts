import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common'

export const GetUserPrivileges = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        try {
            return request.user['sub']
        } catch (e) {
            throw new ForbiddenException()
        }
    }
)