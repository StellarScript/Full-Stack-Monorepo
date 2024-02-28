import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../../guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('/profile')
   @UseGuards(ClerkAuthGuard)
   public async UserProfile() {
      return await this.userService.userProfile();
   }
}
