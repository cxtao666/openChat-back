import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/index';
import { GroupMsgProviders } from './groupMsg.providers';
import { GroupMsgService } from './groupMsg.service';

@Module({
  imports: [DatabaseModule],
  providers: [...GroupMsgProviders, GroupMsgService],
  exports: [GroupMsgService],
})
export class GroupMsgModule {}
