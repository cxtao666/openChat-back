import { NestFactory } from '@nestjs/core';
import { readEnv } from './common/readEnv';
readEnv(); //将环境变量挂载到进程的env中
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZipkinProvider } from './middleware/zipkin/zipkin.providers';
import { ZipkinMiddleware } from './middleware/zipkin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const tracer = new ZipkinProvider().getTracer();
  app.use(ZipkinMiddleware, { tracer });

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
