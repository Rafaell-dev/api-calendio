import { hash } from 'bcrypt';
import { UserRepository } from '../../repositories/UserRepository';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { ErrorMessage } from 'src/types/ExceptionMessages';
import { ConflictException } from 'src/exceptions/ConflictException';
import { Injectable } from '@nestjs/common';
import { User } from '../../entities/User';

interface UpdateUserRequest {
  id: string;
  data: {
    email?: string;
    name?: string;
    password?: string;
    organizationId?: string;
  };
}

@Injectable()
export class UpdateUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, data }: UpdateUserRequest): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!data) {
      throw new NotFoundException(ErrorMessage.DATA_IS_REQUIRED);
    }

    if (!user) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    if (data.email) {
      const userAlreadyExist = await this.userRepository.findByEmail(
        data.email,
      );

      if (userAlreadyExist)
        throw new ConflictException(ErrorMessage.EMAIL_ALREADY_EXISTS);
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const updateDate = new Date();

    const updatedData = {
      ...user,
      ...data,
      updatedAt: updateDate,
    };

    const updatedUser = await this.userRepository.updateById(id, updatedData);

    return updatedUser;
  }
}
