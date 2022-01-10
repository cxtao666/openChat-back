import { Controller, Get, Query } from '@nestjs/common';
import { FriendService } from './friend.service';
import { ResPack } from '../../common/resPack';
import { UserService } from '../user/user.service';

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
  ) {}

  //根据用户id，获取用户的好友列表，再根据好友的信息去获取对应的聊天记录
  @Get('pullFriendList')
  async pullFriendList(@Query() query: FriendReq): Promise<resBody> {
    console.log(query.id);
    const friendIdList = await this.friendService.findAllFriend(query.id);
    console.log(friendIdList);
    const arr = [];
    for (const val of friendIdList) {
      const data = await this.userService.find(val);
      delete data.password;
      arr.push(data);
    }
    return new ResPack(arr).success();
  }
}
