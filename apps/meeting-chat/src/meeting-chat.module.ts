import { Module } from '@nestjs/common';
import { FriendModule } from 'apps/meeting/src/modules/friend/friend.module';
import { GroupModule } from 'apps/meeting/src/modules/group/group.module';
import { GroupMsgModule } from 'apps/meeting/src/modules/groupMsg/groupMsg.module';
import { MsgModule } from 'apps/meeting/src/modules/msg/msg.module';
import { MeetingChatController } from './meeting-chat.controller';
import { MeetingChatService } from './meeting-chat.service';
import { WsStartGateway } from './modules/ws/ws.gateway';

@Module({
  imports: [MsgModule, FriendModule, GroupModule, GroupMsgModule],
  controllers: [MeetingChatController],
  providers: [MeetingChatService, WsStartGateway],
})
export class MeetingChatModule {}
