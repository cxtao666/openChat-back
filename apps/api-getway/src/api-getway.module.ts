import { Module } from '@nestjs/common';
import { ApiGetwayController } from './api-getway.controller';
import { ApiGetWayService } from './api-getway.service';

@Module({
  imports: [],
  controllers: [ApiGetwayController],
  providers: [ApiGetWayService],
})
export class ApiGetWayModule {}
