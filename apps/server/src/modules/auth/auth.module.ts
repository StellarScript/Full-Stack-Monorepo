import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { WebhookStrategy } from './strategy/webhook.strategy';

@Module({
   imports: [ConfigModule, UserModule],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy, WebhookStrategy],
   exports: [AuthService],
})
export class AuthModule {
   public configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtStrategy.authMiddleware).forRoutes('*');
   }
}
