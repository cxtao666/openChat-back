import { Module } from '@nestjs/common';
import { NestServiceController } from './nest-service.controller';
import { NestServiceService } from './nest-service.service';
import { ConsulModule } from '@app/common/modules/consul/consul.module';

@Module({
  imports: [ConsulModule],
  controllers: [NestServiceController],
  providers: [NestServiceService],
})
export class NestServiceModule {}
