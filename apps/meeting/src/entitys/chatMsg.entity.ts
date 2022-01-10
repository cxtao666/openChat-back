import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chat_msg' })
export class ChatMsgEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'send_user_id' })
  userId: string;

  @Column({ type: 'varchar', name: 'accept_user_id' })
  targetUserId: string;

  @Column({ type: 'varchar', name: 'msg_id' })
  msgId: string;

  @Column({
    type: 'int',
    name: 'sign_flag',
  })
  isRead: number;

  @Column({
    type: 'varchar',
    name: 'create_time',
  })
  createTime: string;

  @Column({
    type: 'varchar',
    name: 'msg',
  })
  message: string;
}
