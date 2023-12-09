import { Module } from '@nestjs/common';
import { ElasticsearchService } from './es.service';

@Module({ providers: [ElasticsearchService], exports: [ElasticsearchService] })
export class ElasticsearchModule {}
