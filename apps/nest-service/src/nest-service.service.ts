import { Injectable } from '@nestjs/common';

interface Book {
  msg: string;
}

@Injectable()
export class NestServiceService {
  getHello(): Book {
    return { msg: '蔡贤涛' };
  }
}
