import { ConflictException, NotFoundException } from 'src/exceptions';
import { makeOrganization } from '../../factories/organizationFactory';
import { OrganizationRepositoryInMemory } from '../../repositories/OrganizationRepositoryInMemory';
import { ErrorMessage } from 'src/types';
import { UpdateOrganizationByIdUseCase } from './updateOrganizationByIdUseCase';

describe('UpdateOrganizationByIdUseCase', () => {
  let updateOrganizationByIdUseCase: UpdateOrganizationByIdUseCase;
  let organizationRepositoryInMemory: OrganizationRepositoryInMemory;

  beforeEach(() => {
    organizationRepositoryInMemory = new OrganizationRepositoryInMemory();
    updateOrganizationByIdUseCase = new UpdateOrganizationByIdUseCase(organizationRepositoryInMemory);
  });

  it('should update an organization successfully', async () => {
    const organization = makeOrganization({});
    organizationRepositoryInMemory.organizations = [organization];

    const updatedOrganization = await updateOrganizationByIdUseCase.execute({
      id: organization.id,
      data: { name: 'Updated Org' },
    });

    expect(updatedOrganization).toEqual(expect.objectContaining({ name: 'Updated Org' }));
  });

  it('should throw NotFoundException if organization is not found', async () => {
    await expect(updateOrganizationByIdUseCase.execute({ id: '1', data: { name: 'Test' } })).rejects.toThrow(
      new NotFoundException(ErrorMessage.NOT_FOUND),
    );
  });

  it('should throw NotFoundException if data is missing', async () => {
    const organization = makeOrganization({});
    organizationRepositoryInMemory.organizations = [organization];

    await expect(updateOrganizationByIdUseCase.execute({ id: organization.id, data: undefined as any })).rejects.toThrow(
      new NotFoundException(ErrorMessage.DATA_IS_REQUIRED),
    );
  });

  it('should throw ConflictException if CNPJ already exists', async () => {
    const cnpj = '12345678000195';
    const organization = makeOrganization({ cnpj });
    organizationRepositoryInMemory.organizations = [organization];

    await expect(updateOrganizationByIdUseCase.execute({
      id: organization.id,
      data: { cnpj },
    })).rejects.toThrow(new ConflictException(ErrorMessage.CONFLICT));
  });
});
