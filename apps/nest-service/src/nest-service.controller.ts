import { Controller } from '@nestjs/common';
import { NestServiceService } from './nest-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Book } from '@app/common/types/proto/book/book';
import { ConsulService } from '../../../libs/common/src/modules/consul/consul.service';
import { HealthCheckResponse, HealthCheckResponse_ServingStatus } from '@app/common/types/proto/health/health';

@Controller()
export class NestServiceController {
  constructor(
    private readonly nestServiceService: NestServiceService,
    private consulService: ConsulService,
  ) {
    consulService.registerService(
      'nest-service4',
      'host.docker.internal',
      4000,
      true,
    );
  }

  @GrpcMethod('BookService', 'getHello')
  getHello(): Book {
    return this.nestServiceService.getHello();
  }

  @GrpcMethod('Health', 'Check')
  check(): HealthCheckResponse {
    return { status: HealthCheckResponse_ServingStatus.SERVING };
  }
}
