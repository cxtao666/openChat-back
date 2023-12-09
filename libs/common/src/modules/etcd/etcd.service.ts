import { Injectable } from '@nestjs/common';
import { Etcd3, IOptions } from 'etcd3';

@Injectable()
export class EtcdService {
  private etcd: Etcd3;

  constructor() {
    const options: IOptions = {
      hosts: 'docker-etcd:2379', // etcd服务器的地址
    };
    this.etcd = new Etcd3(options);
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.etcd.put(key).value(value);
  }

  async getValue(key: string): Promise<string | undefined> {
    const result = await this.etcd.get(key).string();
    return result || undefined;
  }

  async deleteKey(key: string): Promise<void> {
    await this.etcd.delete().key(key);
  }
}
