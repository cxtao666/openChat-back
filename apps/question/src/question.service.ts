import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  getHello(): string {
    return 'Hello World!';
  }
}
