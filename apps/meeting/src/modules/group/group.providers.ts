import { Connection } from 'typeorm';
import { MyGroupEntity } from '../../entitys/group.entity';
import { GroupMsgEntity } from '../../entitys/groupMsg.entity';
import { RoomEntity } from '../../entitys/room.entity';
import { RoomRequestEntity } from '../../entitys/roomRequest';
import { UserEntity } from '../../entitys/user.entity';

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
