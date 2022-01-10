import { Connection } from 'typeorm';
import { MyFriendEntity } from '../../entitys/friend.entity';

export const FriendProviders = [
  {
    provide: 'MyFriendRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(MyFriendEntity),
    inject: ['DbConnectionToken'],
  },
];
