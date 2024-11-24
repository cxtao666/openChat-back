import { NestFactory } from '@nestjs/core';
import { ApiGetWayModule } from './api-getway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGetWayModule);
  await app.listen(3000);
}
bootstrap();
