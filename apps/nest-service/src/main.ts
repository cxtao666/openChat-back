import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestServiceModule } from './nest-service.module';

// host 要写0.0.0.0，不然容器端口无法暴露出去访问，很坑
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NestServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 4000,
      },
    },
  );
  app.listen();
}
bootstrap();
