import { Controller, Get, Query } from '@nestjs/common';
import { FriendService } from './friend.service';
import { ResPack } from '../../common/resPack';
import { UserService } from '../user/user.service';
import { MsgService } from '../msg/msg.service';

interface FriendReq {
  id: string;
}

interface resBody {
  message: string;
  status: string;
}

@Controller('/api/myFriend')
export class FriendController {
  constructor(
    private readonly friendService: FriendService,
    private readonly userService: UserService,
    private readonly msgService: MsgService,
  ) {}

  //根据用户id，获取用户的好友列表，再根据好友的信息去获取对应的聊天记录
  @Get('pullFriendList')
  async pullFriendList(@Query() query: FriendReq): Promise<resBody> {
    const friendIdList = await this.friendService.findAllFriend(query.id);
    console.log('拉取到到的好友列表', friendIdList);
    const arr = [];
    for (const val of friendIdList) {
      const data = await this.userService.find(val);
      delete data.password;
      const message = await this.msgService.selectFriendFirstMessage(
        query.id,
        val,
      );
      arr.push({ data, message });
    }
    return new ResPack(arr).success();
  }
}
