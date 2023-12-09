import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ResPack } from '@app/common/index';
import { GroupService } from './group.service';

export interface GroupReq {
  roomId: string;
  userId: string;
  message?: string;
}

interface resBody {
  message: string;
  status: string;
}

interface queryReq {
  userId?: string;
  roomId?: string;
}

@Controller('/api/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //拒绝群申请，就把群申请删除掉
  @Get('rejectAddRoom')
  async rejectAddRoom(@Query() query: GroupReq): Promise<resBody> {
    await this.groupService.deleteGroupRequest(query);
    return new ResPack('已拒绝对方的群申请').success();
  }

  @Post('requestJoinGroup')
  async requestJoinGroup(@Body() groupRequest: GroupReq): Promise<resBody> {
    if (!groupRequest.message || !groupRequest.userId || !groupRequest.roomId) {
      return new ResPack('输入的消息有误').error();
    }

    // TODO 判断申请加入群的成员是否已经在群中
    const userList = await this.groupService.queryGroupUser(
      groupRequest.roomId,
    );

    for (const item of userList) {
      if (item.userId === groupRequest.userId) {
        return new ResPack('您当前已经在该群聊中').error();
      }
    }

    await this.groupService.saveGroupRequest(groupRequest);
    return new ResPack('已经向群管理者发送消息').success();
  }

  //加入群聊
  @Post('joinGroup')
  async newGroup(@Body() groupRelationship: GroupReq): Promise<resBody> {
    this.groupService.joinGroup(
      groupRelationship.roomId,
      groupRelationship.userId,
    );
    return new ResPack('成功加入群聊').success();
  }

  //退出群聊
  @Post('leaveGroup')
  async leaveGroup(@Body() groupRelationship: GroupReq): Promise<resBody> {
    await this.groupService.leaveGroup(
      groupRelationship.roomId,
      groupRelationship.userId,
    );
    return new ResPack('已退出群聊').success();
  }

  //查询群聊中有哪些人
  @Get('queryGroupUser')
  async queryGroupUser(@Query() query: queryReq): Promise<resBody> {
    const userList = await this.groupService.queryGroupUser(query.roomId);
    return new ResPack(
      userList.map((item) => {
        return item.userId;
      }),
    ).success();
  }

  // 查询某个人加了哪些群
  @Get('queryUserGroup')
  async queryUserGroup(@Query() query: queryReq): Promise<resBody> {
    const roomList = await this.groupService.queryUserGroup(query.userId);
    console.log('test', query.userId, roomList);
    return new ResPack(roomList).success();
  }

  @Get('getAddGroupRequest')
  async getAddGroupRequest(@Query() query: { id: string }): Promise<resBody> {
    const data = await this.groupService.getAddGroupRequest(query.id);
    return new ResPack(data).success();
  }

  @Get('updateNewMessageId')
  async updateNewMessageId(
    @Query() query: { roomId: string; userId: string; id: number },
  ) {
    await this.groupService.updateNewMessageId(query);
  }

  @Get('pullGroupMessage')
  async pullGroupMessage(
    @Query()
    query: {
      roomId: string;
      take: number;
      skip: number | undefined;
      startId: number | undefined;
    },
  ): Promise<resBody> {
    const messageList = await this.groupService.pullGroupMessage(
      query.roomId,
      query.take,
      query.skip,
      query.startId,
    );
    return new ResPack({ messageList, roomId: query.roomId }).success();
  }
}
