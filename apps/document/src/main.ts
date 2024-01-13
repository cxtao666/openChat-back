import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './document.module';

async function bootstrap() {
  const app = await NestFactory.create(DocumentModule);
  await app.listen(3000);
}
bootstrap();
