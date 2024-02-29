import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { CreateUserWebhookDto } from '@appify/dto';

@Injectable()
export class UserRepository {
   constructor(private readonly prisma: PrismaProvider) {}

   public async createAccount(data: CreateUserWebhookDto) {
      return await this.prisma.user.create({
         data: {
            id: data.id,
            primaryEmail: data.email_addresses.find((e) => e.id === data.primary_email_address_id)
               .email_address,
            emailAddresses: data.email_addresses,
         },
      });
   }
}
