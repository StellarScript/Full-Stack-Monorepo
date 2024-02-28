import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider extends PrismaClient {
   async onModuleInit(): Promise<void> {
      await this.$connect();
   }

   async onModuleDestroy(): Promise<void> {
      await this.$disconnect();
   }
}
