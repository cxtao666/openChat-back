import { Connection } from 'typeorm';
import { ChatMsgEntity } from '../../entitys/chatMsg.entity';

export const MsgProviders = [
  {
    provide: 'ChatMsgRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(ChatMsgEntity),
    inject: ['DbConnectionToken'],
  },
];
