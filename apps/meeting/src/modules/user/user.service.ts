import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../entitys/user.entity';
import { Repository } from 'typeorm';

interface UserDto {
  username: string;
  password: string;
  nickname?: string; // 昵称
  avatar?: string; // 头像
  id?: string; // id
}

@Injectable()
export class UserService {
  constructor(
    @Inject('userRepositoryToken')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({ username }: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ username });
    return user;
  }

  async addOne(user: UserDto): Promise<UserEntity> {
    await this.userRepository.insert(user);
    return null;
  }

  async find(id: string) {
    const user = await this.userRepository.findOne({ id });
    return user;
  }
}
