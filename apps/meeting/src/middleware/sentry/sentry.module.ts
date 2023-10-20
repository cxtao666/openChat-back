import { Module } from '@nestjs/common';
import { SentryProvider } from './sentry.providers';

@Module({
  providers: [SentryProvider],
  exports: [SentryProvider],
})
export class SentryModule {}
