import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CustomLogger } from '@app/common/modules/log/log.service';
import { RedisService } from '@app/common/modules/redis/redis.service';
import { PublisherService } from '@app/common/modules/rabbitmq/publisher.service';
import { SubscriberService } from '@app/common/modules/rabbitmq/subscriber.service';
import { ElasticsearchService } from '@app/common/modules/es/es.service';
import { register } from 'prom-client';
import { EtcdService } from '@app/common/modules/etcd/etcd.service';
import { ConsulService } from '../../../libs/common/src/modules/consul/consul.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private log: CustomLogger,
    private redis: RedisService,
    private publicer: PublisherService,
    private subscribe: SubscriberService,
    private es: ElasticsearchService,
    private etcdService: EtcdService,
    private consulService: ConsulService,
  ) {
   // consulService.registerService('app', '127.0.01', 3000);
  }

  @ApiOperation({ summary: '请求微服务', description: '微服务测试' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '请求成功',
  })
  @Get('/api/rpc')
  async sayHello() {
    return await this.appService.getHello();
  }

  @Get('/api/redis')
  async testRedis() {
    await this.redis.setValue('foo', 'bar');
    return await this.redis.getValue('foo');
  }

  @Get('/api/log')
  async testLog() {
    console.log('测试一下请求');
    this.log.info('测试一下请求');
    return 'ok';
  }

  @Get('/api/rabit')
  async rabit() {
    const send = await this.publicer.publishMessage('test', '111');
    const res = await this.subscribe.subscribeToMessages('test', (message) => {
      console.log(message);
    });
    send('hello2');
    send('hello3');

    const sendEchange = await this.publicer.publishExchange(
      'echahge',
      'direct',
      'aaa',
      '你好',
      undefined,
    );

    await this.subscribe.subscribeToExchange(
      'echahge',
      'dev',
      'direct',
      'aaa',
      (message) => {
        console.log(message);
      },
    );

    await sendEchange('你好2');
    await sendEchange('你好3');

    return res;
  }

  @Get('/api/es')
  async testEs() {
    await this.es.indexDocument('index', {
      test: '1234',
    });
    return await this.es.search('index', '');
  }

  @Get('/metrics')
  async metrics() {
    return register.metrics();
  }

  @Get('/api/etcd')
  async etcd() {
    await this.etcdService.setValue('key', 'value');
    const data = await this.etcdService.getValue('key');
    console.log(data);
    return data;
  }

  @Get('health')
  health() {
    return { status: 'UP' };
  }
}
