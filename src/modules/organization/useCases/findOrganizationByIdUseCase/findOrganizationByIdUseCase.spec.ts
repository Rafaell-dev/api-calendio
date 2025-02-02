import { NotFoundException } from 'src/exceptions';
import { makeOrganization } from '../../factories/organizationFactory';
import { OrganizationRepositoryInMemory } from '../../repositories/OrganizationRepositoryInMemory';
import { ErrorMessage } from 'src/types';
import { findOrganizationByIdUseCase } from './findOrganizationByIdUseCase';

describe('FindOrganizationByIdUseCase', () => {
  let findOrganizationById: findOrganizationByIdUseCase;
  let organizationRepositoryInMemory: OrganizationRepositoryInMemory;

  beforeEach(() => {
    organizationRepositoryInMemory = new OrganizationRepositoryInMemory();
    findOrganizationById = new findOrganizationByIdUseCase(organizationRepositoryInMemory);
  });

  it('should find an organization by id', async () => {
    const organization = makeOrganization({});
    organizationRepositoryInMemory.organizations = [organization];

    const foundOrganization = await findOrganizationById.execute(organization.id);

    expect(foundOrganization).toEqual(organization);
  });

  it('should throw NotFoundException if organization does not exist', async () => {
    await expect(findOrganizationById.execute('non-existent-id')).rejects.toThrow(
      new NotFoundException(ErrorMessage.NOT_FOUND),
    );
  });
});
