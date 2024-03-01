import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

import { JwtStrategy } from '@modules/auth/strategy/jwt.strategy';
import { IS_PUBLIC_IDENTIFIER, BYPASS_GLOBAL_GUARD } from '@decorators/constants.decorator';

export class JwtAuthGuard extends AuthGuard(JwtStrategy.key) implements CanActivate {
   async canActivate(context: ExecutionContext): Promise<boolean> {
      if (this.shouldSkipAuth(context)) {
         return true;
      }
      return (await super.canActivate(context)) as boolean;
   }

   private shouldSkipAuth(context: ExecutionContext): boolean {
      const isPublic = new Reflector().getAllAndOverride<boolean>(IS_PUBLIC_IDENTIFIER, [
         context.getHandler(),
         context.getClass(),
      ]);
      if (isPublic) {
         return true;
      }
      const shouldByPass = new Reflector().getAllAndOverride<boolean>(BYPASS_GLOBAL_GUARD, [
         context.getHandler(),
         context.getClass(),
      ]);
      if (shouldByPass) {
         return true;
      }
   }
}
