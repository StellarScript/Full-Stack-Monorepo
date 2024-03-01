import { Module } from '@nestjs/common';
import { PrismaModule } from '@providers/prisma/prisma.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
   imports: [PrismaModule],
   controllers: [UserController],
   providers: [UserService, UserRepository],
   exports: [UserService, UserRepository],
})
export class UserModule {}
