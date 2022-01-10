import { MyFriendEntity } from '../entitys/friend.entity';
import { UserEntity } from '../entitys/user.entity';

export const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password:
    process.env.NODE_ENV === 'production'
      ? process.env.DB_PASSWORD_PRO
      : process.env.DB_PASSWORD_DEV,
  database: process.env.DB_NAME,
  entities: [UserEntity,MyFriendEntity],
  synchronize: true,
  timezone: '+08:00',
  cache: {
    duration: 60000,
  },
  extra: {
    poolMax: 32,
    poolMin: 16,
    queueTimeout: 60000,
    pollPingInterval: 60,
    pollTimeout: 60,
  },
};
