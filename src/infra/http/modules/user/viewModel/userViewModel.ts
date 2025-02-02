import { User } from '../../../../../modules/user/entities/User';
export class UserViewModel {
  static toHttp(data: User) {
    return {
      id: data.id,
      nome: data.name,
      email: data.email,
      organizacaoId: data.organizationId,
      dataCriacao: data.createdAt,
      dataAtualizacao: data.updatedAt,
    };
  }
}
