import { Organization } from "src/modules/organization/entities/Organization";

export class OrganizationViewModel {
    static toHttp(data: Organization) {
        return {
            id: data.id,
            name: data.name,
            cnpj: data.cnpj,
            inscricaoEstadual: data.inscricaoEstadual,
            nomeFantasia: data.nomeFantasia,
            phone: data.phone,
            razaoSocial: data.razaoSocial,
            dataCriacao: data.createdAt,
            dataAtualizacao: data.updatedAt,
        };
    }
}