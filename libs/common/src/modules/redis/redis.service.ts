import { isProd } from '@app/common/common';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    // 连接redis的sentinel服务器
    const host = isProd() ? 'redis-sentinel' : process.env.DEV_HOST; // Redis服务器的地址
    this.client = new Redis({
      sentinels: [{ host, port: 26379 }],
      name: 'mymaster',
    });
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async deleteKey(key: string): Promise<void> {
    await this.client.del(key);
  }
}
