import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Webhook } from 'svix';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { config } from '@appify/config';
import { WebhookEvent } from '@clerk/clerk-sdk-node';

const STRATEGY_NAME = 'webhook.strategy';

@Injectable()
export class WebhookStrategy extends PassportStrategy(Strategy, STRATEGY_NAME) {
   static key = STRATEGY_NAME;

   async validate(req: Request): Promise<any> {
      try {
         const isValid = this.verifyWebhookRequest(req);
         if (!isValid) {
            throw new BadRequestException('Invalid webhook request.');
         }

         const requestAuth = req.body;
         if (!requestAuth || !requestAuth.data || requestAuth.object !== 'event') {
            throw new UnauthorizedException('Invalid authentication details.');
         }

         return requestAuth;
      } catch (error) {
         if (error instanceof BadRequestException) {
            throw error;
         } else {
            throw new UnauthorizedException();
         }
      }
   }

   private verifyWebhookRequest(req: Request): boolean {
      const payloadString = JSON.stringify(req.body);
      const svixHeaders = {
         'svix-id': req.get('svix-id')!,
         'svix-timestamp': req.get('svix-timestamp')!,
         'svix-signature': req.get('svix-signature')!,
      };

      if (!svixHeaders['svix-id'] || !svixHeaders['svix-timestamp'] || !svixHeaders['svix-signature']) {
         throw new BadRequestException('Missing required Svix headers.');
      }
      try {
         const wh = new Webhook(config.clerk.webhookSecret);
         const whObject = wh.verify(payloadString, svixHeaders) as WebhookEvent;
         return whObject.data && whObject.object === 'event';
      } catch (error) {
         throw new BadRequestException('Webhook verification failed.');
      }
   }
}
