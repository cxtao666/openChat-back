import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '请求微服务', description: '微服务测试' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '请求成功',
  })
  @Get('/')
  async sayHello() {
    return await this.appService.getHello();
  }
}
