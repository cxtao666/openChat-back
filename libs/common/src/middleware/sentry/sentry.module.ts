import { Module } from '@nestjs/common';
import { SentryProvider } from './sentry.providers';
import { SentryMiddleware } from '.';

@Module({
  providers: [SentryProvider, SentryMiddleware],
  exports: [SentryProvider],
})
export class SentryModule {}
