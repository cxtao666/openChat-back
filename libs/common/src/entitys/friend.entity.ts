import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'my_friends' })
export class MyFriendEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'my_user_id' })
  myUserId: string;

  @Column({ type: 'varchar', name: 'my_friend_user_id' })
  myFriendUserId: string;
}
