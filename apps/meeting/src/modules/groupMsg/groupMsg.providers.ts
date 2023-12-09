import { Connection } from 'typeorm';
import { GroupMsgEntity } from '@app/common/index';

export const GroupMsgProviders = [
  {
    provide: 'groupMsgRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(GroupMsgEntity),
    inject: ['DbConnectionToken'],
  },
];
