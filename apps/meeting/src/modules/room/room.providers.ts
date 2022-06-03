import { Connection } from 'typeorm';
import { RoomEntity } from '../../entitys/room.entity';

export const RoomProviders = [
  {
    provide: 'RoomRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getRepository(RoomEntity),
    inject: ['DbConnectionToken'],
  },
];
