import { Body, Controller, Post } from '@nestjs/common';
import { UserAccountDto } from '@appify/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('signup')
   public async Signup(@Body() data: UserAccountDto) {
      return await this.authService.signup(data);
   }
}
