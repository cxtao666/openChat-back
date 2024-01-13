import { NestFactory } from '@nestjs/core';
import { QuestionModule } from './question.module';

async function bootstrap() {
  const app = await NestFactory.create(QuestionModule);
  await app.listen(3000);
}
bootstrap();
