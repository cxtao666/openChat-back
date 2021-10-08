import { Injectable } from '@nestjs/common';

@Injectable()
export class NestServiceService {
  getHello(): string {
    return '蔡贤涛';
  }
}
