import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { mapperClassValidationErrorToAppException } from './utils/mappers';
import { BadRequestException } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('luna-api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new BadRequestException({
          fields: mapperClassValidationErrorToAppException(errors),
        });
      },
    }),
  );
  await app.listen(process.env.PORT || 3002);
}

bootstrap();
