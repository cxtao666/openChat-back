import { Controller } from '@nestjs/common';
import { NestServiceService } from './nest-service.service';
import { GrpcMethod } from '@nestjs/microservices';

interface Book {
  msg: string;
}

@Controller()
export class NestServiceController {
  constructor(private readonly nestServiceService: NestServiceService) {}

  @GrpcMethod('BookService', 'getHello')
  getHello(): Book {
    return this.nestServiceService.getHello();
  }
}
