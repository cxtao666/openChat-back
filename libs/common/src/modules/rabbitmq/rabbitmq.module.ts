import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { RabbitMQService } from './rabbitmq.service';
import { SubscriberService } from './subscriber.service';

@Module({
  providers: [RabbitMQService, PublisherService, SubscriberService],
  exports: [PublisherService, SubscriberService],
})
export class RabbitMQModule {}
