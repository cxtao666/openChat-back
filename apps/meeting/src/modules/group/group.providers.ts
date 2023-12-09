import { Connection } from 'typeorm';
import { MyGroupEntity } from '@app/common/index';
import { GroupMsgEntity } from '@app/common/index';
import { RoomEntity } from '@app/common/index';
import { RoomRequestEntity } from '@app/common/index';
import { UserEntity } from '@app/common/index';

export const GroupProviders = [
  {
    provide: 'GroupRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(MyGroupEntity),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'RoomRequestRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(RoomRequestEntity),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'RoomRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(RoomEntity),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'GroupMsgRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(GroupMsgEntity),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: ['DbConnectionToken'],
  },
];
