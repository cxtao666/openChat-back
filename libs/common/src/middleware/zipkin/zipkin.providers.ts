import { Injectable, Scope } from '@nestjs/common';
import * as zipkin from 'zipkin';

@Injectable()
export class ZipkinProvider {
  private tracer: zipkin.Tracer;
  constructor() {
    const recorder = new zipkin.ConsoleRecorder();
    const ctxImpl = new zipkin.ExplicitContext();
    const localServiceName = 'meeting'; // 你的NestJS应用程序名称
    this.tracer = new zipkin.Tracer({
      ctxImpl,
      recorder,
      localServiceName,
    });
  }

  getTracer(): zipkin.Tracer {
    return this.tracer;
  }
}
