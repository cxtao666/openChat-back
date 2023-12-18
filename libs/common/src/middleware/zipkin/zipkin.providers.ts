import { Injectable, Scope } from '@nestjs/common';
import * as zipkin from 'zipkin';
import * as CLSContext from 'zipkin-context-cls';
import * as HttpLogger from 'zipkin-transport-http';


@Injectable()
export class ZipkinProvider {
  private tracer: zipkin.Tracer;
  constructor() {
    const recorder = new zipkin.BatchRecorder({
      logger: new HttpLogger.HttpLogger({
        endpoint: 'http://localhost:9411/api/v2/spans',
        jsonEncoder: zipkin.jsonEncoder.JSON_V2,
      }),
    });
    const ctxImpl = new CLSContext('zipkin');
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
