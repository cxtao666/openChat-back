import { Module } from '@nestjs/common';
import { ZipkinProvider } from './zipkin.providers';

@Module({
  providers: [ZipkinProvider],
  exports: [ZipkinProvider],
})
export class ZipkinModule {}
