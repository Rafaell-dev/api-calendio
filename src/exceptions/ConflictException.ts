
import { ErrorMessage } from "src/types";
import { AppException } from "./appException";
import { HttpStatus } from "@nestjs/common";

export class ConflictException extends AppException {
  constructor(message?: ErrorMessage) {
    super({
      message: ErrorMessage.CONFLICT, //melhoria futura na mensagem de erro
      status: HttpStatus.CONFLICT,
    });
  }
}