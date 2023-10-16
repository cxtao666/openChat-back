import { Module } from '@nestjs/common';
import { ElasticsearchService } from './es.service';

@Module({ providers: [ElasticsearchService] })
export class ElasticsearchModule {}
