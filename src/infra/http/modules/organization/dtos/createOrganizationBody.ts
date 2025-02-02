import { IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

export class CreateOrganizationBody {
    @IsStringCustom()
    @IsNotEmptyCustom()
    name: string;

    @IsStringCustom()
    @IsOptional()
    razaoSocial: string;
    
    @IsStringCustom()
    @IsOptional()
    nomeFantasia: string;

    @IsStringCustom()
    @IsOptional()
    cnpj: string;

    @IsStringCustom()
    @IsOptional()
    inscricaoEstadual: string;

    @IsStringCustom()
    @IsOptional()
    phone: string;
}