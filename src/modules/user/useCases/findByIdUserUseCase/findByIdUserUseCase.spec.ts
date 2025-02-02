import { FindByIdUserUseCase } from './findByIdUserUseCase';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { makeUser } from '../../factories/userFactory';
import { ErrorMessage } from 'src/types/ExceptionMessages';

let findByIdUserUseCase: FindByIdUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('FindByIdUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    findByIdUserUseCase = new FindByIdUserUseCase(userRepositoryInMemory);
  });

  it('Should find a user by ID successfully', async () => {
    const user = makeUser({});
    userRepositoryInMemory.users = [user];

    const foundUser = await findByIdUserUseCase.execute(user.id);

    expect(foundUser).toEqual(user);
  });

  it('Should throw an error if user is not found', async () => {
    await expect(findByIdUserUseCase.execute('nonexistent-id')).rejects.toThrow(NotFoundException);

    await expect(findByIdUserUseCase.execute('nonexistent-id')).rejects.toEqual(
      new NotFoundException(ErrorMessage.USER_NOT_FOUND)
    );
  });
});
