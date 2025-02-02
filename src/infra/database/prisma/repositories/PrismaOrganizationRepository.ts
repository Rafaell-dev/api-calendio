import { OrganizationRepository } from 'src/modules/organization/repositories/OrganizationRepository';
import { PrismaService } from '../prisma.service';
import { Organization } from 'src/modules/organization/entities/Organization';
import { PrismaOrganizationMapper } from '../mappers/PrismaOrganizationMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async create(organization: Organization): Promise<void> {
    const organizationRaw = PrismaOrganizationMapper.toPrisma(organization);

    await this.prisma.organization.create({
      data: organizationRaw,
    });
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        cnpj,
      },
    });

    if (!organization) return null;

    return PrismaOrganizationMapper.toDomain(organization);
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!organization) return null;

    return PrismaOrganizationMapper.toDomain(organization);
  }

  async updateById(
    id: string,
    organization: Partial<Organization>,
  ): Promise<Organization | null> {
    const organizationRaw =
      PrismaOrganizationMapper.toPrismaPartial(organization);

    const updatedOrganization = await this.prisma.organization.update({
      where: {
        id,
      },
      data: organizationRaw,
    });

    if (!updatedOrganization) return null;

    return PrismaOrganizationMapper.toDomain(updatedOrganization);
  }
}
