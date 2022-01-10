import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatMsgEntity } from '../../entitys/chatMsg.entity';

@Injectable()
export class MsgService {
  constructor(
    @Inject('ChatMsgRepositoryToken')
    private readonly userRepository: Repository<ChatMsgEntity>,
  ) {}
}
