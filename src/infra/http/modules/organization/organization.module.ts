import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { OrganizationController } from './organization.controller';
import { CreateOrganizationUseCase } from 'src/modules/organization/useCases/createOrganizationUseCase/createOrganizationUseCase';
import { UpdateOrganizationByIdUseCase } from 'src/modules/organization/useCases/updateOrganizationByIdUseCase/updateOrganizationByIdUseCase';
import { FindOrganizationByCnpjUseCase } from 'src/modules/organization/useCases/findOrganizationByCnpjUseCase/findOrganizationByCnpjUseCase';
import { findOrganizationByIdUseCase } from 'src/modules/organization/useCases/findOrganizationByIdUseCase/findOrganizationByIdUseCase';

@Module({
    imports: [DatabaseModule],
    controllers: [OrganizationController],
    providers: [
        CreateOrganizationUseCase,
        UpdateOrganizationByIdUseCase,
        findOrganizationByIdUseCase,
        FindOrganizationByCnpjUseCase,
    ],

})
export class OrganizationModule {}