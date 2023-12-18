import { Book } from '@app/common/types/proto/book/book';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestServiceService {
  getHello(): Book {
    return { msg: '蔡贤涛' };
  }
}
