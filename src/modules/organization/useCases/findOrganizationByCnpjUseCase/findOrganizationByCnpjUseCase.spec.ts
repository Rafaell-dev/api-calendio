import { NotFoundException } from 'src/exceptions';
import { makeOrganization } from '../../factories/organizationFactory';
import { OrganizationRepositoryInMemory } from '../../repositories/OrganizationRepositoryInMemory';
import { ErrorMessage } from 'src/types';
import { FindOrganizationByCnpjUseCase } from './findOrganizationByCnpjUseCase';

describe('FindOrganizationByCnpjUseCase', () => {
  let findOrganizationByCnpj: FindOrganizationByCnpjUseCase;
  let organizationRepositoryInMemory: OrganizationRepositoryInMemory;

  beforeEach(() => {
    organizationRepositoryInMemory = new OrganizationRepositoryInMemory();
    findOrganizationByCnpj = new FindOrganizationByCnpjUseCase(organizationRepositoryInMemory);
  });

  it('should find an organization by CNPJ', async () => {
    const organization = makeOrganization({ cnpj: '12345678000195' });
    organizationRepositoryInMemory.organizations = [organization];

    const foundOrganization = await findOrganizationByCnpj.execute('12345678000195');

    expect(foundOrganization).toEqual(organization);
  });

  it('should throw NotFoundException if organization does not exist by CNPJ', async () => {
    await expect(findOrganizationByCnpj.execute('00000000000000')).rejects.toThrow(
      new NotFoundException(ErrorMessage.NOT_FOUND),
    );
  });
});
