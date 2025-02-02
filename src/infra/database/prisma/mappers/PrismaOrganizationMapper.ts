import { Organization } from 'src/modules/organization/entities/Organization';
import { Organization as OrganizationRaw } from '@prisma/client';

export class PrismaOrganizationMapper {
  static toPrisma(organization: Organization): OrganizationRaw {
    return {
      id: organization.id,
      nome: organization.name,
      razaoSocial: organization?.razaoSocial ? organization.razaoSocial : null,
      nomeFantasia: organization.nomeFantasia
        ? organization.nomeFantasia
        : null,
      cnpj: organization.cnpj ? organization.cnpj : null,
      inscricaoEstadual: organization.inscricaoEstadual
        ? organization.inscricaoEstadual
        : null,
      telefone: organization.phone ? organization.phone : null,
      dataCriacao: organization.createdAt,
      dataAtualizacao: organization.updatedAt,
    };
  }

  static toPrismaPartial(organization: Partial<Organization>): Partial<OrganizationRaw> {
    return {
      id: organization.id,
      nome: organization.name,
      razaoSocial: organization?.razaoSocial ? organization.razaoSocial : null,
      nomeFantasia: organization.nomeFantasia
        ? organization.nomeFantasia
        : null,
      cnpj: organization.cnpj ? organization.cnpj : null,
      inscricaoEstadual: organization.inscricaoEstadual
        ? organization.inscricaoEstadual
        : null,
      telefone: organization.phone ? organization.phone : null,
      dataCriacao: organization.createdAt,
      dataAtualizacao: organization.updatedAt,
    };
  }

  static toDomain(organization: OrganizationRaw): Organization {
    return new Organization(
      {
        name: organization.nome,
        razaoSocial: organization?.razaoSocial ? organization.razaoSocial : null,
        nomeFantasia: organization?.nomeFantasia ? organization.nomeFantasia : null,
        cnpj: organization?.cnpj ? organization.cnpj : null,
        inscricaoEstadual: organization?.inscricaoEstadual ? organization.inscricaoEstadual : null,
        phone: organization?.telefone ? organization.telefone : null,
        createdAt: organization.dataCriacao,
        updatedAt: organization.dataAtualizacao,
      },
      organization.id,
    );
  }
}
