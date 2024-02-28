import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      return this.authenticate(request);
   }

   private authenticate(req: Request): boolean {
      const userSession = req['auth'];
      if (userSession && userSession.sessionId && userSession.userId) {
         return true;
      }
      throw new UnauthorizedException();
   }
}
