import { NestFactory } from '@nestjs/core';
import { readEnv } from './common/readEnv';
readEnv(); //将环境变量挂载到进程的env中
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
