import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

describe('QuestionController', () => {
  let questionController: QuestionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [QuestionService],
    }).compile();

    questionController = app.get<QuestionController>(QuestionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(questionController.getHello()).toBe('Hello World!');
    });
  });
});
