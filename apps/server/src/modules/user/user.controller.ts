import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('/profile')
   public async UserProfile(@Req() req: Request) {
      console.log('-----', req);
      return await this.userService.userProfile();
   }
}
