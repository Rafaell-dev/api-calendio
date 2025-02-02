import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../entities/User';
import { hash } from 'bcrypt';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  organizationId: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(data: CreateUserRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExist) throw new UserWithSameEmailException();

    const user = new User({
      ...data,
      password: await hash(data.password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}
