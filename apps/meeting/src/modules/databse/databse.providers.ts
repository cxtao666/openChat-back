import { createConnection } from 'typeorm';
import { dbConfig } from '../../config/database';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection(dbConfig as any),
  },
];
