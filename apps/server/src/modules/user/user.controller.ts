import { Get, Controller } from '@nestjs/common';

import { UserService } from './user.service';
import { UserSessionDto } from '@appify/dto';
import { User } from '@decorators/param.decorator';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('/profile')
   public async UserProfile(@User() user: UserSessionDto) {
      return await this.userService.userProfile();
   }
}
