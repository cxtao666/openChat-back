import { Injectable, Scope } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

@Injectable({
  scope: Scope.DEFAULT,
})
export class SentryProvider {
  constructor() {
    Sentry.init({
      dsn: 'https://4375d00e14ffba1788a2fc9bf7cd8869@o4506071360405504.ingest.sentry.io/4506071364993024',
      integrations: [new ProfilingIntegration()],
      // Performance Monitoring
      tracesSampleRate: 1.0,
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
    });
  }
  getSentry() {
    // 配置sentry
    // Configure Sentry before doing anything else
    return Sentry;
  }
}
