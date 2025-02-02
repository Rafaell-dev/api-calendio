import { IsOptional, Length } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class UpdateOrganizationRequest {
    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsOptional()
    name?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsOptional()
    nomeFantasia?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsOptional()
    razaoSocial?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsOptional()
    @Length(14)
    cnpj?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsOptional()
    inscricaoEstadual?: string;

    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsOptional()
    @Length(11)
    phone?: string;
}