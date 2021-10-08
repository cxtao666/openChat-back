import { Module } from '@nestjs/common';
import { MeetingChatController } from './meeting-chat.controller';
import { MeetingChatService } from './meeting-chat.service';
import { WsStartGateway } from './modules/ws/ws.gateway';

@Module({
  imports: [],
  controllers: [MeetingChatController],
  providers: [MeetingChatService, WsStartGateway],
})
export class MeetingChatModule {}
