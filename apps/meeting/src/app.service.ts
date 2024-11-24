import { BookService } from '@app/common/types/proto/book/book';
import { Health } from '@app/common/types/proto/health/health';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('NEST_SERVICE') private readonly client: ClientGrpc) {}

  private bookService: BookService;
  private service: Health;

  onModuleInit() {
    this.bookService = this.client.getService('BookService');
    this.service = this.client.getService('grpc.health.v1.Health');
  }
  async getHello() {
  //  const res = await this.bookService.getHello({ id: 1 });
    //  return res;
    const res = await this.service.Check({})
    return res
  }
}
