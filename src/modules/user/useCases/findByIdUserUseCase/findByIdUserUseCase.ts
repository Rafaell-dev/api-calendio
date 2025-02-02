import { NotFoundException } from "src/exceptions/NotFoundException";
import { UserRepository } from "../../repositories/UserRepository";
import { ErrorMessage } from "src/types/ExceptionMessages";
import { User } from "../../entities/User";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindByIdUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user)
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    return user;
  }
}