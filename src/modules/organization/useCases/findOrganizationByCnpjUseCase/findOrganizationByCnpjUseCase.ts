import { NotFoundException } from 'src/exceptions';
import { Organization } from '../../entities/Organization';
import { OrganizationRepository } from '../../repositories/OrganizationRepository';
import { ErrorMessage } from 'src/types';

export class FindOrganizationByCnpjUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(cnpj: string): Promise<Organization> {
    if (!cnpj) {
        throw new NotFoundException(ErrorMessage.NOT_FOUND);
    }
    
    const organization = await this.organizationRepository.findByCnpj(cnpj);

    if (!organization) {
        throw new NotFoundException(ErrorMessage.NOT_FOUND);
    }

    return organization;
  }
}
