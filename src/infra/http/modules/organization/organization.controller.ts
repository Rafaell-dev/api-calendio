import { Body, Controller, Post, Patch, Get, Param } from '@nestjs/common';
import { CreateOrganizationUseCase } from 'src/modules/organization/useCases/createOrganizationUseCase/createOrganizationUseCase';
import { CreateOrganizationBody } from './dtos/createOrganizationBody';
import { OrganizationViewModel } from './viewModel/organizationViewModel';
import { UpdateOrganizationByIdUseCase } from 'src/modules/organization/useCases/updateOrganizationByIdUseCase/updateOrganizationByIdUseCase';
import { FindOrganizationByCnpjUseCase } from 'src/modules/organization/useCases/findOrganizationByCnpjUseCase/findOrganizationByCnpjUseCase';
import { findOrganizationByIdUseCase } from 'src/modules/organization/useCases/findOrganizationByIdUseCase/findOrganizationByIdUseCase';

@Controller('organization')
export class OrganizationController {
  constructor(
    private createOrganizationUseCase: CreateOrganizationUseCase,
    private updateOrganizationByIdUseCase: UpdateOrganizationByIdUseCase,
    private findOrganizationByCnpjUseCase: FindOrganizationByCnpjUseCase,
    private findOrganizationByIdUseCase: findOrganizationByIdUseCase,
  ) {}

  @Post('create')
  async createOrganization(@Body() body: CreateOrganizationBody) {
    const { name, cnpj, inscricaoEstadual, nomeFantasia, phone, razaoSocial } =
      body;

    const organization = await this.createOrganizationUseCase.execute({
      name,
      cnpj,
      inscricaoEstadual,
      nomeFantasia,
      phone,
      razaoSocial,
    });

    return OrganizationViewModel.toHttp(organization);
  }

  @Patch('/update/:organizationId')
  async updateOrganizationById(
    @Param('organizationId') organizationId: string,
    @Body() body: CreateOrganizationBody,
  ) {
    const organizationUpdated =
      await this.updateOrganizationByIdUseCase.execute({
        id: organizationId,
        data: body,
      });

    if (organizationUpdated) {
      return OrganizationViewModel.toHttp(organizationUpdated);
    }
  }

  @Get('/:id')
  async getOrganizationById(@Param('id') id: string) {
    const organization = await this.findOrganizationByIdUseCase.execute(id);

    if (organization) {
      return OrganizationViewModel.toHttp(organization);
    }
  }

  @Get('/get_by_cnpj/:cnpj')
  async getOrganizationByCnpj(@Param('cnpj') cnpj: string) {
    const organization = await this.findOrganizationByCnpjUseCase.execute(cnpj);

    if (organization) {
      return OrganizationViewModel.toHttp(organization);
    }
  }
}
