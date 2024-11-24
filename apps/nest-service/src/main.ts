import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { NestServiceModule } from './nest-service.module';
import { join } from 'path';

import { protobufPackage as BookProto } from '@app/common/types/proto/book/book';
import { protobufPackage as HealthProto } from '@app/common/types/proto/health/health';

// host 要写0.0.0.0，不然容器端口无法暴露出去访问，很坑
async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(
    NestServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:4000',
        package: [BookProto, HealthProto],
        protoPath: [
          join(process.cwd(), './proto/book/book.proto'),
          join(process.cwd(), './proto/health/health.proto'),
        ],
      },
    },
  );

  app.listen();
}
bootstrap();
