import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/index';
import { FriendController } from './friend.controller';
import { FriendProviders } from './friend.providers';
import { FriendService } from './friend.service';
import { UserModule } from '../user/user.module';
import { MsgModule } from '../msg/msg.module';

@Module({
  imports: [DatabaseModule, UserModule, MsgModule],
  controllers: [FriendController],
  providers: [...FriendProviders, FriendService],
  exports: [FriendService],
})
export class FriendModule {}
