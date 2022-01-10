import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MyFriendEntity } from '../../entitys/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @Inject('MyFriendRepositoryToken')
    private readonly myFriendRepository: Repository<MyFriendEntity>,
  ) {}

  async findAllFriend(id: string): Promise<string[]> {
    const data = await this.myFriendRepository.find({
      where: { myUserId: id },
      select: ['myFriendUserId'],
    });
    return data.map((item) => {
      return item.myFriendUserId;
    });
  }
}
