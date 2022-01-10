import { Module } from '@nestjs/common';
import { DatabaseModule } from '../databse/database.module';
import { FriendController } from './friend.controller';
import { FriendProviders } from './friend.providers';
import { FriendService } from './friend.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [FriendController],
  providers: [...FriendProviders, FriendService],
})
export class FriendModule {}
