import { UserRepository } from "../../repositories/UserRepository";
import { ErrorMessage } from "src/types";
import { NotFoundException } from "src/exceptions";
import { User } from "../../entities/User";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindByEmailUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

    return user;
  }
}