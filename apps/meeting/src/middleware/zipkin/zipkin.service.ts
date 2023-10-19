import { Injectable } from '@nestjs/common';
import { ZipkinProvider } from './zipkin.providers';

@Injectable()
export class ZipkinService {
  constructor(private zipkinProvider: ZipkinProvider) {}

  someMethod() {
    const tracer = this.zipkinProvider.getTracer();
    // 在这里使用 tracer 记录追踪信息
  }
}
