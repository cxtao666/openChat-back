import { Connection } from 'typeorm';
import { ChatMsgEntity } from '@app/common/index';

export const MsgProviders = [
  {
    provide: 'ChatMsgRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(ChatMsgEntity),
    inject: ['DbConnectionToken'],
  },
];
