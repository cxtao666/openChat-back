import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ type: 'varchar', name: 'nickname' })
  nickname: string;

  @Column({
    type: 'varchar',
    name: 'face_image',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    name: 'face_image_big',
  })
  faceImageBig: string;

  @Column({
    type: 'varchar',
    name: 'qrcode',
  })
  qrcode: string;

  @Column({
    type: 'varchar',
    name: 'cid',
  })
  cid: string;
}
