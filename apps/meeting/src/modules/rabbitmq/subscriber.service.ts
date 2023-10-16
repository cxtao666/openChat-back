import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class SubscriberService {
  constructor(private rabbitMQService: RabbitMQService) {}

  async subscribeToMessages() {
    const channel = await this.rabbitMQService.getConnection().createChannel();
    const exchangeName = 'my-exchange';
    const queueName = 'my-queue';

    channel.assertExchange(exchangeName, 'direct', { durable: false });
    const q = await channel.assertQueue(queueName, { exclusive: false });
    channel.bindQueue(q.queue, exchangeName, '');

    channel.consume(
      q.queue,
      (msg) => {
        console.log(`Received: ${msg.content.toString()}`);
      },
      { noAck: true },
    );
  }
}
