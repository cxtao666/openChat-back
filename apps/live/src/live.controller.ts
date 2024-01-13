import { Controller, Get } from '@nestjs/common';
import { LiveService } from './live.service';

@Controller()
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get()
  getHello(): string {
    return this.liveService.getHello();
  }
}
