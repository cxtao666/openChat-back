import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/databse/database.module';
import { FriendModule } from './modules/friend/friend.module';
import { MsgModule } from './modules/msg/msg.module';
import { FileModule } from './modules/file/file.module';
import { GroupModule } from './modules/group/group.module';
import { RoomModule } from './modules/room/room.module';
import { GroupMsgModule } from './modules/groupMsg/groupMsg.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import { EtcdModule } from './modules/etcd/etcd.module';
import { RedisModule } from './modules/redis/redis.module';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import { ElasticsearchModule } from './modules/es/es.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
