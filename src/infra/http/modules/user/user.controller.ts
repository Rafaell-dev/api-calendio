import { Body, Controller, Post, Patch, Get, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { UpdateUserByIdUseCase } from 'src/modules/user/useCases/updateUserUseCase/updateUserByIdUseCase';
import { FindByIdUserUseCase } from 'src/modules/user/useCases/findByIdUserUseCase/findByIdUserUseCase';
import { UpdateUserRequest } from './dtos/updateUserBody';

@Controller('usuario')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserByIdUseCase: UpdateUserByIdUseCase,
    private findUserByIdUseCase: FindByIdUserUseCase,
  ) {}

  @Post('cadastrar')
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password, organizationId } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
      organizationId,
    });

    return UserViewModel.toHttp(user);
  }

  @Get('listar/:userId')
  async listGet(@Param('userId') userId: string) {
    const user = await this.findUserByIdUseCase.execute(userId);

    return UserViewModel.toHttp(user);
  }

  @Get('listar_por_email/:email')
  async listByEmailGet(@Param('email') email: string) {
    const user = await this.findUserByIdUseCase.execute(email);

    return UserViewModel.toHttp(user);
  }

  @Patch('atualizar/:userId')
  async updatePatch(
    @Param('userId') userId: string,
    @Body() body: UpdateUserRequest,
  ) {
    const updatedUser = await this.updateUserByIdUseCase.execute({ id: userId, data: body });

    if(updatedUser){
      return UserViewModel.toHttp(updatedUser);
    }
  }
}
