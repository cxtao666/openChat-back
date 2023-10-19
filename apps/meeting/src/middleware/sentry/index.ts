import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// https://cxtao.sentry.io/dashboards/

@Injectable()
export class SentryMiddleware implements NestMiddleware {
  constructor(private sentry) {}
  use(req: Request, res: Response, next: NextFunction) {
    // 使用Sentry捕获异常
    this.sentry.Handlers.requestHandler()(req, res, next);
    this.sentry.Handlers.errorHandler()(req, res, next);
  }
}
