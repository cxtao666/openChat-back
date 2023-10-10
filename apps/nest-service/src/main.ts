import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { NestServiceModule } from './nest-service.module';
import { join } from 'path';

// host 要写0.0.0.0，不然容器端口无法暴露出去访问，很坑
async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(
    NestServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:4000',
        package: 'book',
        protoPath: join(__dirname, 'book/book.proto'),
      },
    },
  );
  app.listen();
}
bootstrap();
