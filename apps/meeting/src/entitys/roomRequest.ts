import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms_request' })
export class RoomRequestEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'roomId' })
  roomId: string;

  @Column({ type: 'varchar', name: 'userId' })
  userId: string;

  @Column({ type: 'varchar', name: 'request_datetime' })
  requestDateTime: string;

  @Column({ type: 'varchar', name: 'request_message' })
  message: string;
}
