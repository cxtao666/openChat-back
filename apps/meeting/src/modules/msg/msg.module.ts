import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/index';
import { MsgController } from './msg.controller';
import { MsgProviders } from './msg.providers';
import { MsgService } from './msg.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MsgController],
  providers: [...MsgProviders, MsgService],
  exports: [MsgService],
})
export class MsgModule {}
