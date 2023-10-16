import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: 'redis', // Redis服务器的地址
      port: 6379, // Redis服务器的端口
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
