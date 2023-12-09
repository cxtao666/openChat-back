import * as winston from 'winston';
import { LogstashTransport } from 'winston-logstash-transport';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new LogstashTransport({
      host: 'logstash', // Logstash服务器的主机名或IP地址
      port: 5044, // Logstash监听的端口
      meta: {
        service: 'meeting', // 你的NestJS应用程序名称
      },
    }),
  ],
});

export { logger };
