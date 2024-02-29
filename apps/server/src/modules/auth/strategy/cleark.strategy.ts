import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { config } from '@appify/config';
import { Strategy } from 'passport-custom';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';

const STRATEGY_NAME = 'cleark.strategy';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, STRATEGY_NAME) {
   static key = STRATEGY_NAME;

   protected async validate(req: Request) {
      const requestAuth = req['auth'].sessionClaims;

      if (!requestAuth || !requestAuth.sub || !requestAuth.sid) {
         throw new UnauthorizedException();
      }
      return requestAuth;
   }

   public static async authMiddleware(req: Request, res: Response, next: NextFunction) {
      const auth = ClerkExpressWithAuth({
         jwtKey: config.clerk.clerkJwtKey,
         signInUrl: config.clerk.clerkJwksUrl,
      });
      return await auth(req, res, next);
   }
}
