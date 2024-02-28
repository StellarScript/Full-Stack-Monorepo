import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { config } from '@appify/config';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'cleark.strategy') {
   static key = 'cleark.strategy';

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
