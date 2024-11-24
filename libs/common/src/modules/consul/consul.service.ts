import { Injectable } from '@nestjs/common';
import Consul = require('consul');

@Injectable()
export class ConsulService {
  private consul: Consul;

  constructor() {
    this.consul = new Consul();
  }

  async getServiceAddress(serviceName: string): Promise<string> {
    const services = await this.consul.catalog.service.nodes(serviceName);
    if (!services || services.length === 0) {
      throw new Error(`Service ${serviceName} not found`);
    }
    const service = services[0];
    return `${service.Address}:${service.ServicePort}`;
  }

  async registerService(serviceName: string, address: string, port: number , isRpc: boolean = false) {
    this.consul.agent.service
      .register({
        name: serviceName,
        address,
        port,
        check: {
          name: serviceName,
          http: isRpc ? undefined : `http://${address}:${port}/health`,
          grpc: isRpc ? `${address}:${port}` : undefined,
          interval: '10s',
          timeout: '5s',
        },
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
