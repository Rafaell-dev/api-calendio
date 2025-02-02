import { User } from 'src/modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): UserRaw {
    return {
      id: user.id,
      email: user.email,
      nome: user.name,
      senha: user.password,
      dataCriacao: user.createdAt,
      dataAtualizacao: user.updatedAt,
      organizacaoId: user.organizationId,
    };
  }

  static toPrismaPartial(user: Partial<User>): Partial<UserRaw> {
    return {
      id: user.id,
      email: user.email,
      nome: user.name,
      senha: user.password,
      dataCriacao: user.createdAt,
      dataAtualizacao: user.updatedAt,
      organizacaoId: user.organizationId,
    };
  }

  static toDomain(user: UserRaw): User {
    return new User(
      {
        email: user.email,
        name: user.nome,
        password: user.senha,
        createdAt: user.dataCriacao,
        updatedAt: user.dataAtualizacao,
        organizationId: user.organizacaoId,
      },
      user.id,
    );
  }
}
