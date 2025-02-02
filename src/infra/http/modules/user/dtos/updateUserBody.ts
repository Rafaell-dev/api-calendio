import { IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';

export class UpdateUserRequest {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsEmailCustom()
  @IsOptional()
  email?: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsOptional()
  name?: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  @IsOptional()
  password?: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsOptional()
  organizationId?: string;
}
