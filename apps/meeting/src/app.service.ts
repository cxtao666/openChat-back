import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('NEST_SERVICE') private readonly client: ClientProxy) {}
  getHello(): Promise<string> {
    return this.client.send<string>({ cmd: 'getHello' }, '123').toPromise();
  }
}
