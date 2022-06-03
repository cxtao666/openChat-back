import { Controller, Get, Query } from '@nestjs/common';
import { MsgService } from './msg.service';
import { ResPack } from '../../common/resPack';

export interface FriendMsgeReq {
  id: string;
  targetId: string;
  skip: number;
  take: number;
  startId: number;
}

export interface MsgCenter {
  id: string;
  targetId: string;
}

interface resBody {
  message: string;
  status: string;
}

@Controller('/api/msg')
export class MsgController {
  constructor(private readonly msgService: MsgService) {}
  //根据用户id，获取用户的好友列表，再根据好友的信息去获取对应的聊天记录
  @Get('pullFriendMessage')
  async pullFriendMessage(@Query() query: FriendMsgeReq): Promise<resBody> {
    if (!query.id || !query.targetId) {
      return new ResPack('prop is error').error();
    }
    const messageList = await this.msgService.pullFriendMessage({ ...query });
    console.log('拉取到的用户间的聊天记录', messageList);
    return new ResPack(messageList).success();
  }

  @Get('centerMessageIsRead')
  async centerMessageIsRead(@Query() query: MsgCenter): Promise<resBody> {
    if (!query.id || !query.targetId) {
      return new ResPack('参数有误').error();
    }
    this.msgService.centerMessageIsRead(query.id, query.targetId);
    console.log(query.id + '看了' + query.targetId + '的消息');
    console.log('信息已读状态被更新');
    return new ResPack('消息更新成功').success();
  }
}
