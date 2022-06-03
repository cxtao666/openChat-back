import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'my_groups' })
export class MyGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'userid' })
  userId: string;

  @Column({ type: 'varchar', name: 'roomid' })
  roomId: string;

  @Column({ type: 'varchar', name: 'new_message_id' })
  newMessageId: number;
}
