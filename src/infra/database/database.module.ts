import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { OrganizationRepository } from 'src/modules/organization/repositories/OrganizationRepository';
import { PrismaOrganizationRepository } from './prisma/repositories/PrismaOrganizationRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: OrganizationRepository,
      useClass: PrismaOrganizationRepository,
    }
  ],
  exports: [UserRepository, OrganizationRepository],
})
export class DatabaseModule {}
