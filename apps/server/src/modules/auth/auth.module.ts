import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
   imports: [ConfigModule, UserModule],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
   exports: [AuthService],
})
export class AuthModule {
   public configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtStrategy.authMiddleware).forRoutes('*');
   }
}
