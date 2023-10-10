import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface FindById {
  id: number;
}
interface Book {
  msg: string;
}
interface BookService {
  getHello(param: FindById): Book;
}

@Injectable()
export class AppService {
  constructor(@Inject('NEST_SERVICE') private readonly client: ClientGrpc) {}

  private bookService: BookService;

  onModuleInit() {
    this.bookService = this.client.getService('BookService');
  }
  async getHello() {
    const res = await this.bookService.getHello({ id: 1 });
    return res;
  }
}
