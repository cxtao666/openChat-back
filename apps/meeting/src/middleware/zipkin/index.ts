import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as zipkin from 'zipkin';

@Injectable()
export class ZipkinMiddleware implements NestMiddleware {
  constructor(private tracer: zipkin.Tracer) {}

  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      const ctxImpl = new zipkin.ExplicitContext();
      const traceId = this.tracer.createRootId();
      const { method, path } = req;

      const traceInfo = {
        traceId,
        name: `${method} ${path}`,
      };

      this.tracer.scoped(() => {
        this.tracer.setId(traceId);
        ctxImpl.letContext(traceInfo, () => {
          // Do any Zipkin-related logic here
          next();
        });
      });
    };
  }
}
