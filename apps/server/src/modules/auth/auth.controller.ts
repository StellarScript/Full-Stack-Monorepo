import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserWebhookDto } from '@appify/dto';
import { WebhookGuard } from '@guards/webhook.guard';
import { UseGuardOverride } from '@decorators/route.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('signup')
   @UseGuardOverride(WebhookGuard)
   public async Signup(@Body('data') data: CreateUserWebhookDto) {
      return await this.authService.signup(data);
   }
}
