import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { UpdateUserByIdUseCase } from './updateUserByIdUseCase';
import { makeUser } from '../../factories/userFactory';
import { ErrorMessage } from 'src/types/ExceptionMessages';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { ConflictException } from 'src/exceptions/ConflictException';

let updateUserUseCase: UpdateUserByIdUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
describe('UpdateUserByIdUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    updateUserUseCase = new UpdateUserByIdUseCase(userRepositoryInMemory);
  });

  it('Should update user successfully', async () => {
    const user = makeUser({});
    userRepositoryInMemory.users = [user];

    await updateUserUseCase.execute({
      id: user.id,
      data: { name: 'Updated Name' },
    });

    // Verifique se o usuário foi atualizado na memória
    expect(userRepositoryInMemory.users[0].name).toBe('Updated Name');
  });

  it('Should throw an error when no data is provided', async () => {
    const user = makeUser({});
    userRepositoryInMemory.users = [user];

    await expect(
      updateUserUseCase.execute({
        id: user.id,
        data: undefined as any, // Simula a ausência de dados
      })
    ).rejects.toThrow(NotFoundException);

    await expect(
      updateUserUseCase.execute({
        id: user.id,
        data: undefined as any,
      })
    ).rejects.toEqual(new NotFoundException(ErrorMessage.DATA_IS_REQUIRED));
  });

  it('Should throw an error when user is not found', async () => {
    await expect(
      updateUserUseCase.execute({
        id: 'nonexistent-id',
        data: { name: 'Updated Name' },
      })
    ).rejects.toThrow(NotFoundException);

    await expect(
      updateUserUseCase.execute({
        id: 'nonexistent-id',
        data: { name: 'Updated Name' },
      })
    ).rejects.toEqual(new NotFoundException(ErrorMessage.USER_NOT_FOUND));
  });

  it('Should throw an error when email already exists', async () => {
    const user1 = makeUser({ email: 'email1@example.com' });
    const user2 = makeUser({ email: 'email2@example.com' });
    userRepositoryInMemory.users = [user1, user2];

    await expect(
      updateUserUseCase.execute({
        id: user1.id,
        data: { email: user2.email },
      })
    ).rejects.toEqual(new ConflictException(ErrorMessage.EMAIL_ALREADY_EXISTS));

    await expect(
      updateUserUseCase.execute({
        id: user1.id,
        data: { email: user2.email },
      })
    ).rejects.toEqual(
      new ConflictException(ErrorMessage.EMAIL_ALREADY_EXISTS)
    );
  });

  it('Should encrypt the password when updating', async () => {
    const user = makeUser({});
    userRepositoryInMemory.users = [user];

    const newPassword = 'newpassword123';

    await updateUserUseCase.execute({
      id: user.id,
      data: { password: newPassword },
    });

    const isPasswordEncrypted = await compare(
      newPassword,
      userRepositoryInMemory.users[0].password || ''
    );

    expect(isPasswordEncrypted).toBe(true);
  });
});
