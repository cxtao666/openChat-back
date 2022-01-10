import { Controller, Get, Query } from '@nestjs/common';
import { MsgService } from './msg.service';
import { ResPack } from '../../common/resPack';

interface MsgReq {
  id: string;
}

interface resBody {
  message: string;
  status: string;
}

@Controller('/api/msg')
export class MsgController {
  constructor(private readonly MsgService: MsgService) {}

  //根据用户id，获取用户的好友列表，再根据好友的信息去获取对应的聊天记录
}
