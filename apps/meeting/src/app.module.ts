import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from '@app/common/index';
import { FriendModule } from './modules/friend/friend.module';
import { MsgModule } from './modules/msg/msg.module';
import { FileModule } from '@app/common/index';
import { GroupModule } from './modules/group/group.module';
import { RoomModule } from './modules/room/room.module';
import { GroupMsgModule } from './modules/groupMsg/groupMsg.module';
import { AuthModule } from '@app/common/index';
import { join } from 'path';
import { EtcdModule } from '@app/common/index';
import { RedisModule } from '@app/common/index';
import { RabbitMQModule } from '@app/common/index';
import { ElasticsearchModule } from '@app/common/index';
import { ZipkinMiddleware } from '@app/common/index';
import { SentryMiddleware } from '@app/common/index';
import { SentryModule } from '@app/common/index';
import { ZipkinModule } from '@app/common/index';
import { CustomLogModule } from '@app/common/index';
const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEST_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${isProd ? 'nest-service' : 'localhost'}:4000`,
          package: 'book',
          protoPath: join(__dirname, 'book/book.proto'),
        },
      },
    ]),
    SentryModule,
    ZipkinModule,
    DatabaseModule,
    UserModule,
    FriendModule,
    MsgModule,
    FileModule,
    GroupModule,
    RoomModule,
    GroupMsgModule,
    AuthModule,
    EtcdModule,
    RedisModule,
    RabbitMQModule,
    ElasticsearchModule,
    CustomLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZipkinMiddleware).forRoutes('*');
    consumer.apply(SentryMiddleware).forRoutes('*');
  }
}
