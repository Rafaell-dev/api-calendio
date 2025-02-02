import { Organization } from '../entities/Organization';

type Override = Partial<Organization>;

export const makeOrganization = ({ id, ...override }: Override) => {
  return new Organization(
    {
      name: 'Organization',
      cnpj: '123456789',
      inscricaoEstadual: '123456789',
      phone: '123456789',
      nomeFantasia: 'Organization',
      razaoSocial: 'Organization',
      ...override,
    },
    id,
  );
};
