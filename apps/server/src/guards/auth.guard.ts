import { AuthGuard } from '@nestjs/passport';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { ClerkStrategy } from '@modules/auth/strategy/cleark.strategy';

export class ClerkAuthGuard extends AuthGuard(ClerkStrategy.key) implements CanActivate {
   async canActivate(context: ExecutionContext): Promise<boolean> {
      return (await super.canActivate(context)) as boolean;
   }
}
