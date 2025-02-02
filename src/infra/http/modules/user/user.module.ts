import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UpdateUserByIdUseCase } from 'src/modules/user/useCases/updateUserUseCase/updateUserByIdUseCase';
import { FindByIdUserUseCase } from 'src/modules/user/useCases/findByIdUserUseCase/findByIdUserUseCase';
import { FindByEmailUserUseCase } from 'src/modules/user/useCases/findByEmailUserUseCase/findByEmailUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase, 
    UpdateUserByIdUseCase, 
    FindByIdUserUseCase, 
    FindByEmailUserUseCase,
  ],
})
export class UserModule {}
