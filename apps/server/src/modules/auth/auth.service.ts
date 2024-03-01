import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { CreateUserWebhookDto } from '@appify/dto';

@Injectable()
export class AuthService {
   private readonly logger = new Logger(AuthService.name);
   constructor(private readonly userRepository: UserRepository) {}

   public async signup(data: CreateUserWebhookDto) {
      try {
         await this.userRepository.createAccount(data);
      } catch (error) {
         this.logger.error(`Create User Account Error: ${error}`);
         throw new InternalServerErrorException('Failed to create user account.');
      }
   }
}
