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
const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEST_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 4000,
          host: isProd ? 'nest-service' : 'localhost',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
