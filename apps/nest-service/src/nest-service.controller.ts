import { Controller } from '@nestjs/common';
import { NestServiceService } from './nest-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class NestServiceController {
  constructor(private readonly nestServiceService: NestServiceService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    return this.nestServiceService.getHello();
  }
}
