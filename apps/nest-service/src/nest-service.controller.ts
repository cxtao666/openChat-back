import { Controller } from '@nestjs/common';
import { NestServiceService } from './nest-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Book } from '@app/common/types/proto/book/book';

@Controller()
export class NestServiceController {
  constructor(private readonly nestServiceService: NestServiceService) {}

  @GrpcMethod('BookService', 'getHello')
  getHello(): Book {
    return this.nestServiceService.getHello();
  }
}
