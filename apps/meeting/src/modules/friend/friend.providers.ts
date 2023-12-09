import { Connection } from 'typeorm';
import { MyFriendEntity } from '@app/common/index';

export const FriendProviders = [
  {
    provide: 'MyFriendRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(MyFriendEntity),
    inject: ['DbConnectionToken'],
  },
];
