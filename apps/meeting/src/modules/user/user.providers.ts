import { Connection } from 'typeorm';
import { UserEntity } from '@app/common/index';

export const UserProviders = [
  {
    provide: 'userRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: ['DbConnectionToken'],
  },
];
