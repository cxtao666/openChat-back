import { UserEntity } from '../entitys/user.entity';

export const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '19990612',
  database: 'meeting',
  entities: [UserEntity], //数据库表和js对象的映射关系
  synchronize: true,
};
