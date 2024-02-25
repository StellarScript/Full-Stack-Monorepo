import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@appify/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from '@modules/user/user.module';

@Module({
   imports: [ConfigModule.forRoot({ load: [configuration] }), UserModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
