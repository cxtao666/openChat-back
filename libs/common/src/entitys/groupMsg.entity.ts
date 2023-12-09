import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'group_msg' })
export class GroupMsgEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'userid' })
  userId: string;

  @Column({ type: 'varchar', name: 'roomid' })
  roomId: string;

  @Column({
    type: 'varchar',
    name: 'msg_id',
  })
  msgId: string;

  @Column({
    type: 'datetime',
    name: 'create_time',
  })
  createTime: string | number;

  @Column({
    type: 'varchar',
    name: 'msg',
  })
  message: string;
}
