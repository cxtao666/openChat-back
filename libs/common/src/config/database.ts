import { ChatMsgEntity } from '../entitys/chatMsg.entity';
import { MyFriendEntity } from '../entitys/friend.entity';
import { MyGroupEntity } from '../entitys/group.entity';
import { GroupMsgEntity } from '../entitys/groupMsg.entity';
import { RoomEntity } from '../entitys/room.entity';
import { RoomRequestEntity } from '../entitys/roomRequest';
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
  entities: [
    UserEntity,
    MyFriendEntity,
    ChatMsgEntity,
    GroupMsgEntity,
    MyGroupEntity,
    RoomEntity,
    RoomRequestEntity,
  ],
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
  charset: 'utf8mb4',
};
