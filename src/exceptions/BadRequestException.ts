import { ErrorMessage } from "../types/ExceptionMessages";
import { AppException, AppExceptionProps } from "./appException";
import { HttpStatus } from "@nestjs/common";

interface IncorrectValuesExceptionProps {
  fields: AppExceptionProps['fields'];
}

export class BadRequestException extends AppException {
  constructor({ fields }: IncorrectValuesExceptionProps) {
    super({
      message: ErrorMessage.BAD_REQUEST,
      fields,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}