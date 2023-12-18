import { isProd } from '@app/common/common';
import { Injectable, Query } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;

  constructor() {
    amqp
      .connect(`amqp://${isProd() ? 'rabbitmq' : process.env.DEV_HOST}:5672`)
      .then((res) => {
        this.connection = res;
        console.log('Connected to RabbitMQ');
      })
      .catch((err) => {
        console.error('Error connecting to RabbitMQ', err);
      });
  }

  async createQueue(queue: string) {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queue);
    return async (data: any) => {
      await channel.sendToQueue(queue, Buffer.from(data));
    };
  }

  async connectQueue(queue: string, cb: (message: string) => void) {
    const channel = await this.connection.createChannel();
    const { queryInstance } = await channel.assertQueue(queue);
    channel.consume(
      queryInstance,
      (message) => {
        cb(message.content.toString());
      },
      { noAck: true }, // 设置是否收到消息后自动删除
    );
  }

  async createExchange(
    exchangeName: string,
    type: 'direct' | 'fanout' | 'topic' | 'headers',
  ) {
    const channel = await this.connection.createChannel();
    await channel.assertExchange(exchangeName, type);
    return async (
      route: string,
      data: any,
      headers?: { headers: Record<string, string> },
    ) => {
      channel.publish(exchangeName, route, Buffer.from(data), headers);
    };
  }

  async subscribeExchange(
    cb: (message: string) => void,
    exchangeName: string,
    queue: string,
    type: 'direct' | 'fanout' | 'topic' | 'headers',
    route: string,
    headers?: Record<string, string>,
  ) {
    const channel = await this.connection.createChannel();
    if (type !== 'direct') {
      await channel.assertExchange(exchangeName, type);
    }

    const { queueInstacne } = await channel.assertQueue(queue);
    await channel.bindQueue(queueInstacne, exchangeName, route, headers);

    channel.consume(
      queueInstacne,
      (msg) => {
        cb(msg.content.toString());
      },
      { noAck: true },
    );
  }
}
