import { ErrorMessage } from 'src/types';
import { Organization } from '../../entities/Organization';
import { OrganizationRepository } from '../../repositories/OrganizationRepository';
import { ConflictException, NotFoundException } from 'src/exceptions';

export interface UpdateOrganizationRequest {
  id: string;
  data: {
    name?: string;
    nomeFantasia?: string;
    razaoSocial?: string;
    cnpj?: string;
    inscricaoEstadual?: string;
    phone?: string;
  };
}

export class UpdateOrganizationByIdUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    id,
    data,
  }: UpdateOrganizationRequest): Promise<Organization | null> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) throw new NotFoundException(ErrorMessage.NOT_FOUND);

    if (!data) {
      throw new NotFoundException(ErrorMessage.DATA_IS_REQUIRED);
    }

    if (data.cnpj) {
      const organizationAlreadyExist =
        await this.organizationRepository.findByCnpj(data.cnpj);

      if (organizationAlreadyExist)
        throw new ConflictException(ErrorMessage.CONFLICT);
    }

    const updateDate = new Date();w

    const updatedData = {
      ...organization,
      ...data,
      updatedAt: updateDate,
    };

    const updatedOrganization = await this.organizationRepository.updateById(
      id,
      updatedData,
    );

    return updatedOrganization;
  }
}
