import { Injectable, Query } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class PublisherService {
  constructor(private rabbitMQService: RabbitMQService) {}

  async publishMessage(queue: string, message?: string) {
    const sendMessage = await this.rabbitMQService.createQueue(queue);
    message && (await sendMessage(message));
    return async (newMessage) => {
      return sendMessage(newMessage);
    };
  }

  async publishExchange(
    exChange: string,
    type: 'direct' | 'fanout' | 'topic' | 'headers',
    route: string,
    message?: string,
    headers?: Record<string, string>,
  ) {
    const sendMessage = await this.rabbitMQService.createExchange(
      exChange,
      type,
    );
    message && (await sendMessage(route, message, headers && { headers }));
    return async (newMessage) => {
      return sendMessage(route, newMessage, headers && { headers });
    };
  }
}
