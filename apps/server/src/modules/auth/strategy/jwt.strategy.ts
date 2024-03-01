import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { config } from '@appify/config';
import { Strategy } from 'passport-custom';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';

const STRATEGY_NAME = 'jwt.strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY_NAME) {
   private readonly logger = new Logger(JwtStrategy.name);
   static key = STRATEGY_NAME;

   protected async validate(req: Request) {
      const requestAuth = req['auth']?.sessionClaims;
      if (!requestAuth || !requestAuth.sub || !requestAuth.sid) {
         this.logger.error('JwtStrategy missing or invalid session claims');
         throw new UnauthorizedException('Missing or invalid session claims');
      }
      return requestAuth;
   }

   public static async authMiddleware(req: Request, res: Response, next: NextFunction) {
      try {
         const auth = ClerkExpressWithAuth({
            jwtKey: config.clerk.clerkJwtKey,
            signInUrl: config.clerk.clerkJwksUrl,
         });
         await auth(req, res, next);
      } catch (error) {
         const logger = new Logger(JwtStrategy.name);
         logger.error('Authentication middleware error:', error);
         throw new UnauthorizedException();
      }
   }
}
