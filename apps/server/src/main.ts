import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { isProdEnv, originUrl } from '@appify/utils';
import { JwtAuthGuard } from '@guards/auth.guard';
import { AppModule } from './app/app.module';

declare const module: {
   hot: HotModule;
};

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);

   const port = configService.get<number>('app.serverPort', 3000);
   const origin = originUrl(port);

   app.use(helmet()); // Apply Helmet for security
   app.use(cookieParser());
   app.enableCors({
      origin: origin,
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type, Authorization, X-CSRF-TOKEN',
   });

   app.setGlobalPrefix('api');
   app.useGlobalGuards(new JwtAuthGuard());
   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         disableErrorMessages: isProdEnv(),
         whitelist: true,
         forbidNonWhitelisted: true,
      }),
   );

   await app.listen(port, () => {
      Logger.log(`🚀 Application running on: ${origin}`, 'Bootstrap');
      Logger.log(`${isProdEnv() ? '🚀 Production' : '🚧 Development'} environment`, 'Environment');
   });

   if (!isProdEnv() && module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
      Logger.log('🔥 Hot reloading enabled');
   }
}

bootstrap();
