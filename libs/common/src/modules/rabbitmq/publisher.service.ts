import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class PublisherService {
  constructor(private rabbitMQService: RabbitMQService) {}

  async publishMessage(message: string) {
    const channel = await this.rabbitMQService.getConnection().createChannel();
    const exchangeName = 'my-exchange';
    channel.assertExchange(exchangeName, 'direct', { durable: false });
    channel.publish(exchangeName, '', Buffer.from(message));
    console.log(`Sent: ${message}`);
    channel.close();
  }
}
