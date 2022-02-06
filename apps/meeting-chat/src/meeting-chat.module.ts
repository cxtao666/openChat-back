import { Module } from '@nestjs/common';
import { FriendModule } from 'apps/meeting/src/modules/friend/friend.module';
import { MsgModule } from 'apps/meeting/src/modules/msg/msg.module';
import { MeetingChatController } from './meeting-chat.controller';
import { MeetingChatService } from './meeting-chat.service';
import { WsStartGateway } from './modules/ws/ws.gateway';

@Module({
  imports: [MsgModule, FriendModule],
  controllers: [MeetingChatController],
  providers: [MeetingChatService, WsStartGateway],
})
export class MeetingChatModule {}
