import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetingChatService {
  getHello(): string {
    return 'Hello World!';
  }
}
