import { Connection } from 'typeorm';
import { GroupMsgEntity } from '../../entitys/groupMsg.entity';

export const GroupMsgProviders = [
  {
    provide: 'groupMsgRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(GroupMsgEntity),
    inject: ['DbConnectionToken'],
  },
];
