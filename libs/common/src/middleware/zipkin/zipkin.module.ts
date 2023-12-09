import { Module } from '@nestjs/common';
import { ZipkinProvider } from './zipkin.providers';
import { ZipkinMiddleware } from '.';

@Module({
  providers: [ZipkinMiddleware, ZipkinProvider],
  exports: [ZipkinProvider],
})
export class ZipkinModule {}
