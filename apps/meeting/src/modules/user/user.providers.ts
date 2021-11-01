import { Connection } from 'typeorm';
import { UserEntity } from '../../entitys/user.entity';

export const UserProviders = [
  {
    provide: 'userRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: ['DbConnectionToken'],
  },
];
