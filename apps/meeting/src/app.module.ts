import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/databse/database.module';
import { FriendModule } from './modules/friend/friend.module';
import { MsgModule } from './modules/msg/msg.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEST_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 4000,
        },
      },
    ]),
    DatabaseModule,
    UserModule,
    FriendModule,
    MsgModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
