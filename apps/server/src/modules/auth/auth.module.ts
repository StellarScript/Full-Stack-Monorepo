import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
   imports: [ConfigModule],
   controllers: [AuthController],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthModule {
   constructor(private readonly configService: ConfigService) {}

   public configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(
            ClerkExpressRequireAuth({
               jwtKey: this.configService.get('clerk.clerkJwtKey'),
               signInUrl: this.configService.get('clerk.clerkJwksUrl'),
            }),
         )
         .forRoutes('*');
   }
}
