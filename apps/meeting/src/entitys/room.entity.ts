import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'master_id' })
  masterId: string;

  @Column({ type: 'varchar', name: 'room_name' })
  roomName: string;

  @Column({ type: 'varchar', name: 'room_username' })
  roomUsername: string;

  @Column({
    type: 'varchar',
    name: 'create_time',
  })
  createTime: string;

  @Column({
    type: 'varchar',
    name: 'notice',
  })
  notice: string;

  @Column({
    type: 'varchar',
    name: 'avator',
  })
  avator: string;
}
