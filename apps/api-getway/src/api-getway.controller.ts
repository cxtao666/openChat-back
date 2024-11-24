import { Controller, Get } from '@nestjs/common';
import { ApiGetWayService } from './api-getway.service';

@Controller()
export class ApiGetwayController {
  constructor(private readonly apiGetWayService: ApiGetWayService) {}

  @Get()
  getHello(): string {
    return this.apiGetWayService.getHello();
  }
}
