import { NestFactory } from '@nestjs/core';
import { readEnv } from './common/readEnv';
readEnv(); //将环境变量挂载到进程的env中
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZipkinProvider } from './middleware/zipkin/zipkin.providers';
import { ZipkinMiddleware } from './middleware/zipkin';
// You can also use CommonJS `require('@sentry/node')` instead of `import`
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { SentryProvider } from './middleware/sentry/sentry.providers';
import { SentryMiddleware } from './middleware/sentry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置zipkin
  const tracer = new ZipkinProvider().getTracer();
  app.use(ZipkinMiddleware, { tracer });

  // 配置sentry
  const sentry = new SentryProvider().getSentry();
  app.use(SentryMiddleware, { sentry });

  // 配置swagger
  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
