import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('/profile')
   @UseGuards(AuthGuard)
   public async UserProfile() {
      return await this.userService.userProfile();
   }
}
