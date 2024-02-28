import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('signup')
   public async Signup() {
      return await this.authService.signup();
   }
}
