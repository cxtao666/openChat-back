import { Injectable, NestMiddleware } from '@nestjs/common';
import * as zipkin from 'zipkin';
import { Request, Response, NextFunction } from 'express'; // 引入Express的类型

@Injectable()
export class ZipkinMiddleware implements NestMiddleware {
  constructor(private tracer: zipkin.Tracer) {}

  use(req: Request, res: Response, next: NextFunction) {
    const ctxImpl = new zipkin.ExplicitContext();
    const traceId = this.tracer.createRootId();
    const { method, path } = req;

    const traceInfo = {
      traceId: traceId.traceId,
      name: `${method} ${path}`,
      parentSpanId: traceId.parentSpanId,
      spanId: traceId.spanId,
      sampled: traceId.sampled,
      isDebug: traceId.isDebug,
      isShared: traceId.isShared,
    };

    this.tracer.scoped(() => {
      this.tracer.setId(traceId);
      ctxImpl.letContext(traceInfo, () => {
        // Do any Zipkin-related logic here
        next();
      });
    });
  }
}
