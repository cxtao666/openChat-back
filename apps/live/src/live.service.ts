import { Injectable } from '@nestjs/common';

@Injectable()
export class LiveService {
  getHello(): string {
    return 'Hello World!';
  }
}
