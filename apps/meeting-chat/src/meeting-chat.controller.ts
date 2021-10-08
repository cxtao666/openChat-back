import { Controller, Get } from '@nestjs/common';
import { MeetingChatService } from './meeting-chat.service';

@Controller()
export class MeetingChatController {
  constructor(private readonly meetingChatService: MeetingChatService) {}

  @Get()
  getHello(): string {
    return this.meetingChatService.getHello();
  }
}
