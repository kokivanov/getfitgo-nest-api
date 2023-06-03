import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common'
import { validate } from 'class-validator';

export const GetBody = createParamDecorator(
    (data : string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        validate(request.body).then((error) =>{
            if (error.length > 0) throw new BadRequestException({message: error})
        })

        return request.body;
    }
)