import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { readEnv } from '@app/common/common/readEnv';
readEnv(); //将环境变量挂载到进程的env中
import { MeetingChatModule } from './meeting-chat.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MeetingChatModule,
    {
      transport: Transport.TCP,
      options: {
        port: 5000,
      },
    },
  );
  await app.listen();
}
bootstrap();
