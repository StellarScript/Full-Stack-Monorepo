import { Controller, Get } from '@nestjs/common';
import { Public } from '@decorators/route.decorator';
import { AppService } from './app.service';

@Public()
@Controller('app')
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get('/health')
   public async HealthCheck() {
      return this.appService.healthCheck();
   }
}
