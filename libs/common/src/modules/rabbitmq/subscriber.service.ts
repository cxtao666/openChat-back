import { Injectable, Query } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class SubscriberService {
  constructor(private rabbitMQService: RabbitMQService) {}

  async subscribeToMessages(queue: string, cb: (message: string) => void) {
    await this.rabbitMQService.connectQueue(queue, (message) => {
      cb(message);
    });
  }

  async subscribeToExchange(
    exChange: string,
    queue: string,
    type: 'direct' | 'fanout' | 'topic' | 'headers',
    route: string,
    cb: (message: string) => void,
    headers?: Record<string, string>,
  ) {
    await this.rabbitMQService.subscribeExchange(
      cb,
      exChange,
      queue,
      type,
      route,
      headers,
    );
  }
}
