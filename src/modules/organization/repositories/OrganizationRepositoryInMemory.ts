import { Organization, OrganizationProps } from "../entities/Organization";
import { OrganizationRepository } from "./OrganizationRepository";

export class OrganizationRepositoryInMemory implements OrganizationRepository {
  public organizations: Organization[] = [];

  async create(organization: Organization): Promise<void> {
    this.organizations.push(organization);
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.organizations.find((organization) => organization.id === id);

    if (!organization) return null;

    return organization;
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = this.organizations.find((organization) => organization.cnpj === cnpj);

    if (!organization) return null;

    return organization
  }
  
  async updateById(id: string, organization: Organization): Promise<Organization | null> {
    const organizationIndex = this.organizations.findIndex((organization) => organization.id === id);

    if (organizationIndex === -1) {
      throw new Error('Organization not found');
    }

    const organizationToUpdate = this.organizations[organizationIndex];
    this.organizations[organizationIndex] = new Organization({...organizationToUpdate, ...organization, updatedAt: new Date()} as OrganizationProps, id);

    return this.organizations[organizationIndex];
  }

}