import { Injectable } from '@nestjs/common';
import { ConflictException } from 'src/exceptions';
import { OrganizationRepository } from '../../repositories/OrganizationRepository';
import { Organization } from '../../entities/Organization';

interface CreateOrganizationRequest {
  name: string;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  cnpj: string | null;
  inscricaoEstadual: string | null;
  phone: string | null;
}

@Injectable()
export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(data: CreateOrganizationRequest) {
    if (data.cnpj) {
      const organizationAlreadyExist =
        await this.organizationRepository.findByCnpj(data.cnpj);

      if (organizationAlreadyExist) {
        throw new ConflictException();
      }
    }

    const organization = new Organization(data);

    await this.organizationRepository.create(organization);

    return organization;
  }
}
