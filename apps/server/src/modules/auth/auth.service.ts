import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { CreateUserWebhookDto } from '@appify/dto';

@Injectable()
export class AuthService {
   private readonly logger = new Logger(AuthService.name);
   constructor(private readonly userRepository: UserRepository) {}

   public async signup(data: CreateUserWebhookDto): Promise<void> {
      try {
         await this.userRepository.createAccount(data);
         this.logger.verbose('User account created successfully.');
      } catch (error) {
         this.logger.error(`Create User Account Error: ${error}`);
         throw new BadRequestException('Failed to create user account.');
      }
   }
}
