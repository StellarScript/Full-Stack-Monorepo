import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@appify/config';

import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
   imports: [ConfigModule.forRoot({ load: [configuration] }), AuthModule, UserModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
