import { isProd } from '@app/common/common';
import { Injectable } from '@nestjs/common';
import { Etcd3, IOptions } from 'etcd3';

@Injectable()
export class EtcdService {
  private etcd: Etcd3;

  constructor() {
    const ectHost = isProd()
      ? 'docker-etcd:2379'
      : `${process.env.DEV_HOST}:2379`;
    const options: IOptions = {
      hosts: ectHost, // etcd服务器的地址
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

  // 服务注册
  async registerService(serviceName, instanceId, metadata) {
    const key = `/services/${serviceName}/${instanceId}`;
    const lease = this.etcd.lease(3600);
    await lease.put(key).value(JSON.stringify(metadata));
    lease.on('lost', async () => {
      console.log('租约过期，重新注册...');
      await this.registerService(serviceName, instanceId, metadata);
    });
  }

  // 服务发现
  async discoverService(serviceName) {
    const instances = await this.etcd
      .getAll()
      .prefix(`/services/${serviceName}`)
      .strings();
    return Object.entries(instances).map(([key, value]) => JSON.parse(value));
  }

  // 监听服务变更
  async watchService(serviceName, callback) {
    const watcher = await this.etcd
      .watch()
      .prefix(`/services/${serviceName}`)
      .create();
    watcher
      .on('put', async (event) => {
        console.log('新的服务节点添加:', event.key.toString());
        callback(await this.discoverService(serviceName));
      })
      .on('delete', async (event) => {
        console.log('服务节点删除:', event.key.toString());
        callback(await this.discoverService(serviceName));
      });
  }
}
