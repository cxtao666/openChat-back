import { Injectable, Inject } from '@nestjs/common';
import { LessThanOrEqual, Repository } from 'typeorm';
import { timeStampToString } from '../../common/time';
import { MyGroupEntity } from '../../entitys/group.entity';
import { GroupMsgEntity } from '../../entitys/groupMsg.entity';
import { RoomEntity } from '../../entitys/room.entity';
import { RoomRequestEntity } from '../../entitys/roomRequest';
import { UserEntity } from '../../entitys/user.entity';
import { GroupReq } from './group.controller';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupRepositoryToken')
    private readonly myGroupRepository: Repository<MyGroupEntity>,
    @Inject('RoomRequestRepositoryToken')
    private readonly RoomRequestRepository: Repository<RoomRequestEntity>,
    @Inject('RoomRepositoryToken')
    private readonly RoomRepository: Repository<RoomEntity>,
    @Inject('GroupMsgRepositoryToken')
    private readonly GroupMsgRepository: Repository<GroupMsgEntity>,
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async joinGroup(roomId: string, userId: string): Promise<boolean> {
    this.myGroupRepository.save({
      userId,
      roomId,
      newMessageId: 0,
    });
    return true;
  }

  async leaveGroup(roomId: string, userId: string): Promise<boolean> {
    this.myGroupRepository.delete({
      roomId,
      userId,
    });
    return true;
  }

  async queryGroupUser(roomId: string): Promise<MyGroupEntity[]> {
    const userList = await this.myGroupRepository.find({
      roomId,
    });
    return userList;
  }

  // 查询用户加入的群信息
  async queryUserGroup(userId: string) {
    const roomList = await this.myGroupRepository.find({
      userId,
    });
    const res = [];
    for (const item of roomList) {
      const room = await this.queryRoomInfo(item.roomId, item.newMessageId);
      res.push(room);
    }
    return res;
  }

  // 查询房间的信息和房间的聊天记录
  async queryRoomInfo(roomId: string, newMessageId = 0) {
    // 查找用户进入的群聊
    const room: any[] = await this.RoomRepository.find({ id: roomId });
    // 查找用户进的群的聊天消息
    const groupMessageList = await this.pullGroupMessage(roomId, 10, 0, 0);

    // 查找加入群的用户信息
    const userIdList = await this.queryGroupUser(roomId);
    const userlist = [];
    for (const userId of userIdList) {
      const user = await this.UserRepository.find({ id: userId.userId });
      delete user[0].password;
      userlist.push(user[0]);
    }
    room[0].joinGroupUserList = userlist;

    // 把最终结果返回给前端
    return {
      room: room[0],
      newMessageId,
      groupMessageList,
    };
  }

  // 同意入群申请
  async saveGroupRequest(groupRequest: GroupReq) {
    await this.RoomRequestRepository.save({
      ...groupRequest,
      requestDateTime: timeStampToString(Date.now()),
    });
  }
  // 删除入群申请
  async deleteGroupRequest(groupRequest: GroupReq) {
    await this.RoomRequestRepository.delete({
      roomId: groupRequest.roomId,
      userId: groupRequest.userId,
    });
  }

  async queryUserGroupList(userId: string) {
    const roomList = await this.myGroupRepository.find({
      userId,
    });
    return roomList;
  }
  // 获得群主创建的群的入群申请信息
  async getAddGroupRequest(masterId: string) {
    const res = [];
    const roomList = await this.RoomRepository.find({ masterId });
    for (const room of roomList) {
      const userList = await this.RoomRequestRepository.find({
        roomId: room.id,
      });
      for (const request of userList) {
        const users = await this.UserRepository.find({ id: request.userId });
        const user = users[0];
        delete user.password;
        res.push({
          user,
          room,
          message: request.message,
          dateTime: request.requestDateTime,
        });
      }
    }
    return res;
  }

  async removeGroup(roomId: string) {
    await this.RoomRequestRepository.delete({ roomId });
    await this.myGroupRepository.delete({ roomId });
    await this.GroupMsgRepository.delete({ roomId });
    await this.RoomRepository.delete({ id: roomId });
  }

  async updateNewMessageId(query: {
    roomId: string;
    userId: string;
    id: number;
  }) {
    this.myGroupRepository.update(
      {
        roomId: query.roomId,
        userId: query.userId,
      },
      { newMessageId: query.id },
    );
  }

  async pullGroupMessage(
    roomId: string,
    take: number,
    skip: number,
    startId: number,
  ) {
    let messageList;
    if (startId !== undefined && startId > 0) {
      const sql = `SELECT * FROM group_msg WHERE id <= ${startId} AND roomid = '${roomId}' ORDER BY id DESC LIMIT ${
        take * skip
      },${take} ;`;
      console.log(sql);
      messageList = await this.GroupMsgRepository.query(sql);

      messageList = messageList.map((item) => {
        return {
          id: item.id,
          userId: item.userid,
          roomId: item.roomid,
          message: item.msg,
          createTime: item.create_time,
          msgId: item.msg_id,
        };
      });
    } else {
      messageList = await this.GroupMsgRepository.find({
        where: [{ roomId: roomId }],
        skip: skip * take,
        take,
        order: {
          id: 'DESC',
        },
      });
    }
    messageList = messageList.reverse();
    const groupMessageList = [];
    for (const message of messageList) {
      const user = await this.UserRepository.find({ id: message.userId });
      delete user[0].password;
      const messageUser = {
        user: user[0],
        ...message,
      };
      groupMessageList.push(messageUser);
    }
    return groupMessageList;
  }
}
