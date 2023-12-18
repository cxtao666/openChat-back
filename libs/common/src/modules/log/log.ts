import { isProd } from '@app/common/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { format, transports } from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

function createDailyRotateTransport(level: string, filename: string) {
  return new winstonDaily({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(format.timestamp(), format.simple()),
  });
}

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Winston', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    ...(isProd()
      ? [] //prd存到es里面，不然容器里边不容易看日志
      : [
          createDailyRotateTransport('warn', 'warn'),
          createDailyRotateTransport('info', 'app'),
          createDailyRotateTransport('error', 'error'),
        ]),
  ],
});

export { logger };
