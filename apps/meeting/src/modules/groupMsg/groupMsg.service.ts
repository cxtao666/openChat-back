import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupMsgEntity } from '@app/common/index';
import { MessageData } from 'apps/meeting-chat/src/modules/ws/ws.gateway';
import { timeStampToString } from '@app/common/index';

@Injectable()
export class GroupMsgService {
  constructor(
    @Inject('groupMsgRepositoryToken')
    private readonly GroupMsgRepository: Repository<GroupMsgEntity>,
  ) {}

  // 保存群聊消息
  async saveGroupMsg(message: MessageData) {
    message.createTime = timeStampToString(Date.now());
    const newMessage = await this.GroupMsgRepository.save(message);
    return newMessage;
  }
}
