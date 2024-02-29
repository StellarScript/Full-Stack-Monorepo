import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { CreateUserWebhookDto } from '@appify/dto';

@Injectable()
export class AuthService {
   constructor(
      private readonly logger: Logger,
      private readonly userRepository: UserRepository,
   ) {}

   public async signup(data: CreateUserWebhookDto) {
      try {
         await this.userRepository.createAccount(data);
      } catch (error) {
         this.logger.error(`Create User Account Error: ${error}`);
         throw new BadRequestException('Error creating user account.');
      }
   }
}
