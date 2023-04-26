import { CanActivate, Inject, Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Authorities } from '../enums';
import { Reflector } from '@nestjs/core';
import { AUTHORITY_KEY } from '../decorators'
@Injectable()
export class AuthorityGuard implements CanActivate {
    constructor(private prisma: PrismaService, private reflector: Reflector) {
        
    }

    async canActivate(context: ExecutionContext) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: BigInt(context.switchToHttp().getRequest().user.sub)
            }, select: {
                id: true,
                role: {
                    select: {
                        priviligiles: true,
                        name: true,
                    }
                }
            }
        })

        const requiredAuthorities = this.reflector.getAllAndOverride<Authorities[]>(AUTHORITY_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);

          if (!requiredAuthorities) {
            return true;
          }

        if (user.role && requiredAuthorities.some((auth) => (user.role.priviligiles & BigInt(auth.toString())) > BigInt(0))) return true
        else throw new ForbiddenException({message: `You have no authority to access this resource.`}) 
    }
}