import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PublicProfileDto } from '@appify/dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
   private readonly logger = new Logger(UserService.name);
   constructor(private readonly userRepository: UserRepository) {}

   public async getProfile(userId: string): Promise<PublicProfileDto> {
      try {
         return await this.userRepository.getAccount(userId);
      } catch (error) {
         this.logger.error(`Error getting user profile: ${error}`);
         throw new NotFoundException('User not found');
      }
   }
}
