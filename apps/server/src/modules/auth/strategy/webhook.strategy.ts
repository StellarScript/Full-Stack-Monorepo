import type { Request } from 'express';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSessionDto, WebhookRequestDto } from '@appify/dto';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

const STRATEGY_NAME = 'webhook.strategy';

@Injectable()
export class WebhookStrategy extends PassportStrategy(Strategy, STRATEGY_NAME) {
   static key = STRATEGY_NAME;

   public async validate(req: Request): Promise<UserSessionDto> {
      const data = req.body as WebhookRequestDto<UserSessionDto>;
      this.verification(data);
      return data.data;
   }

   private verification(data: WebhookRequestDto<UserSessionDto>): void {
      if (!data || data.object !== 'event' || data.type !== 'user.created') {
         throw new UnauthorizedException();
      }
   }
}
