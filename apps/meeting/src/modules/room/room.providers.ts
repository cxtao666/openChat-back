import { Connection } from 'typeorm';
import { RoomEntity } from '@app/common/index';

export const RoomProviders = [
  {
    provide: 'RoomRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(RoomEntity),
    inject: ['DbConnectionToken'],
  },
];
