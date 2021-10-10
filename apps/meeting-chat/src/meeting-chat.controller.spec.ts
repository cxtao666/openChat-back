import { Test, TestingModule } from '@nestjs/testing';
import { MeetingChatController } from './meeting-chat.controller';
import { MeetingChatService } from './meeting-chat.service';

describe('MeetingChatController', () => {
  let meetingChatController: MeetingChatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MeetingChatController],
      providers: [MeetingChatService],
    }).compile();

    meetingChatController = app.get<MeetingChatController>(
      MeetingChatController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(meetingChatController.getHello()).toBe('Hello World!');
    });
  });
});
