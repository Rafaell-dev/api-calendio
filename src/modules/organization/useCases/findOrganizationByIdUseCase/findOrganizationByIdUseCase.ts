import { Organization } from '../../entities/Organization';
import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../repositories/OrganizationRepository';
import { NotFoundException } from 'src/exceptions';
import { ErrorMessage } from 'src/types';

@Injectable()
export class findOrganizationByIdUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new NotFoundException(ErrorMessage.NOT_FOUND);
    }
    
    return organization;
  }
}
