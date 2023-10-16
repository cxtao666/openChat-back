import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://rabbitmq'); // RabbitMQ服务器地址
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ', error);
    }
  }

  getConnection() {
    return this.connection;
  }
}
