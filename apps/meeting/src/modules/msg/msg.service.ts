import { Injectable, Inject } from '@nestjs/common';
import { MessageData } from 'apps/meeting-chat/src/modules/ws/ws.gateway';
import { Repository } from 'typeorm';
import { timeStampToString } from '../../common/time';
import { ChatMsgEntity } from '../../entitys/chatMsg.entity';
import { FriendMsgeReq } from './msg.controller';

@Injectable()
export class MsgService {
  constructor(
    @Inject('ChatMsgRepositoryToken')
    private readonly chatMsgRepository: Repository<ChatMsgEntity>,
  ) {}
  //拉取聊天记录，注意从哪个消息id开始拉信息
  async pullFriendMessage({ id, targetId, take = 5, skip = 0 }: FriendMsgeReq) {
    console.log(id, targetId, take, skip);
    return await this.chatMsgRepository.find({
      where: [
        { userId: id, targetUserId: targetId },
        { userId: targetId, targetUserId: id },
      ],
      skip: skip * take,
      take,
      order: {
        id: 'DESC',
      },
    });
  }
  // 保存用户的聊天消息
  async saveFriendMessage(message: MessageData) {
    message.isRead = message.isRead ? 1 : 0;
    message.createTime = timeStampToString(message.createTime);
    this.chatMsgRepository.save(message);
  }

  //获取用户之间的第一条消息，用于在联系人列表展示
  async selectFriendFirstMessage(id: string, targetId: string) {
    return await this.pullFriendMessage({
      id,
      targetId,
      take: 10,
      skip: 0,
    });
  }

  // 更新消息状态为已读
  async centerMessageIsRead(id: string, targetId: string) {
    return await this.chatMsgRepository.update(
      { userId: targetId, targetUserId: id, isRead: 0 },
      { isRead: 1 },
    );
  }
}
