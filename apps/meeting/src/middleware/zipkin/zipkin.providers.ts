import { Injectable, Scope } from '@nestjs/common';
import * as zipkin from 'zipkin';

@Injectable({
  scope: Scope.DEFAULT,
})
export class ZipkinProvider {
  getTracer(): zipkin.Tracer {
    const recorder = new zipkin.ConsoleRecorder();
    const ctxImpl = new zipkin.ExplicitContext();
    const localServiceName = 'meeting'; // 你的NestJS应用程序名称

    return new zipkin.Tracer({
      ctxImpl,
      recorder,
      localServiceName,
    });
  }
}
