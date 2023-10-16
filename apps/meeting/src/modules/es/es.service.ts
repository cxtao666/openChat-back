import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({ node: 'elasticsearch:9200' }); // Elasticsearch服务器地址
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
