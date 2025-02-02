import { FindByEmailUserUseCase } from './findByEmailUserUseCase';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { makeUser } from '../../factories/userFactory';
import { ErrorMessage } from 'src/types/ExceptionMessages';

let findByEmailUserUseCase: FindByEmailUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory

describe('FindByEmailUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    findByEmailUserUseCase = new FindByEmailUserUseCase(userRepositoryInMemory);
  });

  it('Should find a user by email successfully', async () => {
    const user = makeUser({ email: 'test@example.com' });
    userRepositoryInMemory.users = [user];

    const foundUser = await findByEmailUserUseCase.execute(user.email);

    expect(foundUser).toEqual(user);
  });

  it('Should throw an error if user is not found', async () => {
    await expect(findByEmailUserUseCase.execute('nonexistent@example.com')).rejects.toThrow(NotFoundException);

    await expect(findByEmailUserUseCase.execute('nonexistent@example.com')).rejects.toEqual(
      new NotFoundException(ErrorMessage.USER_NOT_FOUND)
    );
  });
});
