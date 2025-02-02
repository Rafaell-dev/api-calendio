import { ConflictException } from "src/exceptions";
import { makeOrganization } from "../../factories/organizationFactory";
import { OrganizationRepositoryInMemory } from "../../repositories/OrganizationRepositoryInMemory";
import { CreateOrganizationUseCase } from "./createOrganizationUseCase";

let createOrganizationUseCase: CreateOrganizationUseCase;
let organizationRepositoryInMemory: OrganizationRepositoryInMemory;

describe('Create Organization', () => {
  beforeEach(() => {
    organizationRepositoryInMemory = new OrganizationRepositoryInMemory();
    createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepositoryInMemory);
  });

  it('Should be able to create an organization', async () => {
    expect(organizationRepositoryInMemory.organizations).toEqual([]);

    const newOrganization = makeOrganization({});

    const organization = await createOrganizationUseCase.execute(newOrganization);

    expect(organizationRepositoryInMemory.organizations).toEqual([organization]);
  });

  it('Should throw an error when creating an organization with an already existing CNPJ', async () => {
    const organization = makeOrganization({});

    organizationRepositoryInMemory.organizations = [organization];

    await expect(createOrganizationUseCase.execute(organization)).rejects.toThrow(ConflictException);
  });
});
