import { Injectable } from '@nestjs/common';
import { logger } from './log';

@Injectable()
export class CustomLogger {
  private readonly logger = logger;

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
