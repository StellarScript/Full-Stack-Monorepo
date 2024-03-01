import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { CreateUserWebhookDto } from '@appify/dto';

@Injectable()
export class UserRepository {
   private readonly logger = new Logger(UserRepository.name);
   constructor(private readonly prisma: PrismaProvider) {}

   public async createAccount(data: CreateUserWebhookDto) {
      const primaryEmail = data.email_addresses.find(
         (e) => e.id === data.primary_email_address_id,
      ).email_address;

      if (!primaryEmail) {
         this.logger.error('Primary email not found in the provided email addresses.');
         throw new NotFoundException('Primary email not found in the provided email addresses.');
      }

      try {
         return await this.prisma.user.create({
            data: {
               id: data.id,
               locked: data.locked,
               primaryEmail: primaryEmail,
               imageUrl: data.image_url,
               passwordEnabled: data.password_enabled,
               profileImageUrl: data.profile_image_url,
               lastActive: new Date(data.last_active_at).toISOString(),
            },
         });
      } catch (error) {
         throw new Error(error);
      }
   }
}
