import { AuthGuard } from '@nestjs/passport';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { WebhookStrategy } from '@modules/auth/strategy/webhook.strategy';

export class WebhookGuard extends AuthGuard(WebhookStrategy.key) implements CanActivate {
   async canActivate(context: ExecutionContext): Promise<boolean> {
      return (await super.canActivate(context)) as boolean;
   }
}
