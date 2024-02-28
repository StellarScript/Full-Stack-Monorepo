import { config } from '@appify/config';
import { UnauthorizedException } from '@nestjs/common';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import type { Request, Response, NextFunction } from 'express';

export async function ClerkAuth(req: Request, res: Response, next: NextFunction) {
   const auth = ClerkExpressWithAuth({
      jwtKey: config.clerk.clerkJwtKey,
      signInUrl: config.clerk.clerkJwksUrl,
   });
   return await auth(req, res, next);
}
