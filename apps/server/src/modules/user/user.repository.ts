import type { User } from '@prisma/client';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserAccountDto, PublicProfileDto } from '@appify/dto';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { errorMessage } from '@appify/utils';

@Injectable()
export class UserRepository {
   private readonly logger = new Logger(UserRepository.name);
   constructor(private readonly prisma: PrismaProvider) {}

   public async createAccount(data: UserAccountDto): Promise<User> {
      const primaryEmail = data.emailAddresses.find(
         (e) => e.id === data.primaryEmailAddressId,
      ).emailAddress;

      if (!primaryEmail) {
         this.logger.error('Primary email not found in the provided email addresses.');
         throw new NotFoundException('Primary email not found in the provided email addresses.');
      }

      try {
         return await this.prisma.user.create({
            data: {
               id: data.id,
               primaryEmail: primaryEmail,
               profileImageUrl: data.imageUrl,
               passwordEnabled: data.passwordEnabled,
               lastActive: new Date(data.lastSignInAt).toISOString(),
            },
         });
      } catch (error) {
         this.logger.error(`Create User Account Error: ${errorMessage(error)}`);
         throw new Error('Create User Account Error');
      }
   }

   public async getAccount(userId: string): Promise<PublicProfileDto> {
      try {
         return await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: {
               id: true,
               primaryEmail: true,
               profileImageUrl: true,
            },
         });
      } catch (error) {
         this.logger.error(`User not found: ${errorMessage(error)}`);
         throw new Error('User not found');
      }
   }

   public async userExists(userId: string): Promise<boolean> {
      try {
         const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
         });
         return !!user;
      } catch (error) {
         this.logger.error(`Error checking if user exists: ${errorMessage(error)}`);
         throw new Error('Error checking if user exists');
      }
   }
}
