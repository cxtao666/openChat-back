import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { isProd } from '@app/common/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage as BookProto } from '@app/common/types/proto/book/book';
import { protobufPackage as HealthProto } from '@app/common/types/proto/health/health';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEST_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${isProd() ? 'nest-service' : 'localhost'}:4000`,
          package: [BookProto, HealthProto],
          protoPath: [
            join(process.cwd(), './proto/book/book.proto'),
            join(process.cwd(), './proto/health/health.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
