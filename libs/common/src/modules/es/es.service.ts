import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { isProd } from '@app/common/common';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() {
    const esHost = isProd()
      ? 'http://elasticsearch:9200'
      : `http://${process.env.DEV_HOST}:9200`;
    this.client = new Client({ node: esHost }); // Elasticsearch服务器地址
  }

  async indexDocument(index: string, document: any) {
    return this.client.index({
      index,
      body: document,
    });
  }

  async search(index: string, query: any) {
    return this.client.search({
      index,
      body: query,
    });
  }
}
