import type { Request } from 'express';
import { BadRequestException, CanActivate, ExecutionContext, Logger } from '@nestjs/common';

import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { config } from '@appify/config';

export class WebhookGuard implements CanActivate {
   constructor(private readonly logger: Logger) {}

   canActivate(context: ExecutionContext): boolean {
      return this.validateRequest(context.switchToHttp().getRequest());
   }

   private validateRequest(req: Request): boolean {
      const payloadString = JSON.stringify(req.body);
      const svixHeaders = {
         'svix-id': req.get('svix-id')!,
         'svix-timestamp': req.get('svix-timestamp')!,
         'svix-signature': req.get('svix-signature')!,
      };

      try {
         const wh = new Webhook(config.clerk.webhookSecret);
         const whObject = wh.verify(payloadString, svixHeaders) as WebhookEvent;
         if (whObject.data && whObject.object === 'event' && whObject.type === 'user.created') {
            return true;
         }
      } catch (error) {
         this.logger.error(`Webhook Guard Error: ${error}`);
         throw new BadRequestException();
      }
   }
}
