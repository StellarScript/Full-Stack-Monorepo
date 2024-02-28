import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ClerkAuth } from '@utils';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
   imports: [ConfigModule],
   controllers: [AuthController],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthModule {
   public configure(consumer: MiddlewareConsumer) {
      consumer.apply(ClerkAuth).forRoutes('*');
   }
}
