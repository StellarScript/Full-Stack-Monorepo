import passport from 'passport';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClerkStrategy } from './strategy/cleark.strategy';

@Module({
   imports: [ConfigModule],
   controllers: [AuthController],
   providers: [AuthService, ClerkStrategy],
   exports: [AuthService],
})
export class AuthModule {
   public configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(passport.initialize(), ClerkStrategy.authMiddleware)
         .exclude('/app/health')
         .forRoutes('*');
   }
}
