import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getHello(): string {
    return this.questionService.getHello();
  }
}
