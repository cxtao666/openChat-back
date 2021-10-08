import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
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
