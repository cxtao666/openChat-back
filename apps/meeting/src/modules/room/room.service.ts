import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { timeStampToString } from '@app/common/index';
import { RoomEntity } from '@app/common/index';
import { RoomReq } from './room.controller';

@Injectable()
export class RoomService {
  constructor(
    @Inject('RoomRepositoryToken')
    private readonly RoomRepository: Repository<RoomEntity>,
  ) {}

  async newRoom(room: RoomReq): Promise<RoomEntity> {
    const data = await this.RoomRepository.save({
      masterId: room.masterId,
      roomUsername: room.roomUsername,
      roomName: room.roomName,
      createTime: timeStampToString(Date.now()),
      notice: room.notice,
      avator: room.avator,
    });
    console.log('存入数据', data);
    return data;
  }

  async isHasRoom(room: RoomReq): Promise<boolean> {
    const roomNameObj = await this.RoomRepository.findOne({
      roomName: room.roomName,
    });
    if (roomNameObj) {
      return true;
    }
    const roomUserNameObj = await this.RoomRepository.findOne({
      roomUsername: room.roomUsername,
    });
    if (roomUserNameObj) {
      return true;
    }
    return false;
  }
  // roomName 可能是群名称，也可能是群账号
  async queryGroup(roomName: string) {
    console.log(roomName);
    let room = await this.RoomRepository.find({ roomName });
    console.log('房间', room);
    if (room.length !== 0) {
      return room[0];
    }

    room = await this.RoomRepository.find({ roomUsername: roomName });
    console.log('房间', room);
    if (room.length !== 0) {
      return room[0];
    }
  }

  async deleteRoom(roomId: string) {
    await this.RoomRepository.delete({ id: roomId });
  }
}
