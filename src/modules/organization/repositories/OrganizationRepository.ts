import { Organization } from "../entities/Organization";

export abstract class OrganizationRepository {
    abstract create(organization: Organization): Promise<void>;
    abstract findById(id: string): Promise<Organization | null>;
    abstract findByCnpj(cnpj: string): Promise<Organization | null>;
    abstract updateById(id: string, organization: Partial<Organization>): Promise<Organization | null>;
}