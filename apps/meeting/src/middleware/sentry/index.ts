import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SentryProvider } from './sentry.providers';

// https://cxtao.sentry.io/dashboards/

@Injectable()
export class SentryMiddleware implements NestMiddleware {
  constructor(private sentry: SentryProvider) {}
  use(req: Request, res: Response, next: NextFunction) {
    // 使用Sentry捕获异常
    this.sentry.getSentry().Handlers.requestHandler()(req, res, next);
    this.sentry.getSentry().Handlers.errorHandler()(
      new Error(''),
      req,
      res,
      next,
    );
  }
}
