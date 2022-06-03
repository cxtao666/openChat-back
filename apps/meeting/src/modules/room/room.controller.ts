import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResPack } from '../../common/resPack';
import { GroupService } from '../group/group.service';
import { RoomService } from './room.service';

export interface RoomReq {
  masterId: string;
  roomName: string;
  roomUsername: string;
  notice: string;
  avator: string;
  joinGroupUserList?: string[];
}

interface resBody {
  message: string;
  status: string;
}

@Controller('/api/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly groupService: GroupService,
  ) {}

  //创建群聊
  @Post('newRoom')
  async newGroup(@Body() group: RoomReq): Promise<resBody> {
    if (!group.roomName || !group.masterId || !group.roomUsername) {
      return new ResPack('输入群消息有误，请重新输入').error();
    }

    const isNameRepeact = await this.roomService.isHasRoom(group);
    if (isNameRepeact) {
      return new ResPack('群名称已存在，请重新输入').error();
    }
    const room = await this.roomService.newRoom(group);
    this.groupService.joinGroup(room.id, group.masterId);
    if (group.joinGroupUserList) {
      for (const item of group.joinGroupUserList) {
        this.groupService.joinGroup(room.id, item);
      }
    }
    return new ResPack(room).success();
  }

  // 查询群聊信息
  @Get('queryRoom')
  async queryGroup(@Query() query: { roomName: string }): Promise<resBody> {
    const room = await this.roomService.queryGroup(query.roomName);
    console.log('房间信息', room);
    return new ResPack(room).success();
  }

  //删除群聊
  @Post('deleteRoom')
  async deleteRoom(
    @Body() group: { roomId: string; userId: string },
  ): Promise<resBody> {
    const room = await this.roomService.queryGroup(group.roomId);
    if (room.masterId !== group.userId) {
      return new ResPack('您不是群主，无权限解散群').error();
    }
    // 解散群聊，把和群相关的消息都删除掉，然后删除群
    const userList = await this.groupService.queryGroupUser(group.roomId);
    userList.forEach(async (item) => {
      await this.groupService.leaveGroup(group.roomId, item.userId);
    });
    await this.roomService.deleteRoom(group.roomId);
    return new ResPack('群已经解散').success();
  }
}
