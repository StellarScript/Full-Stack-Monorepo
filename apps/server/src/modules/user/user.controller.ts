import { Get, Controller } from '@nestjs/common';

import { UserSessionDto } from '@appify/dto';
import { User } from '@decorators/param.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('/profile')
   public async UserProfile(@User() user: UserSessionDto) {
      return await this.userService.userProfile();
   }
}
