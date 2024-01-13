import { NestFactory } from '@nestjs/core';
import { LiveModule } from './live.module';

async function bootstrap() {
  const app = await NestFactory.create(LiveModule);
  await app.listen(3000);
}
bootstrap();
