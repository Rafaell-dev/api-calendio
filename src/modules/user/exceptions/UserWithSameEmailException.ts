import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';
import { ErrorMessage } from 'src/types/ExceptionMessages';

export class UserWithSameEmailException extends AppException {
  constructor() {
    super({
      message: ErrorMessage.EMAIL_ALREADY_EXISTS,
      status: HttpStatus.CONFLICT,
    });
  }
}
