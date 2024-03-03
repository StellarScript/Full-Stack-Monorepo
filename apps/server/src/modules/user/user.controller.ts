import { Get, Controller } from '@nestjs/common';
import { PublicProfileDto, UserSessionDto } from '@appify/dto';
import { User } from '@decorators/param.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get('/profile')
   public async GetProfile(@User() user: UserSessionDto): Promise<PublicProfileDto> {
      return await this.userService.getProfile(user.sub);
   }
}
