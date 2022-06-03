import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FriendService } from 'apps/meeting/src/modules/friend/friend.service';
import { GroupService } from 'apps/meeting/src/modules/group/group.service';
import { GroupMsgService } from 'apps/meeting/src/modules/groupMsg/groupMsg.service';
import { MsgService } from 'apps/meeting/src/modules/msg/msg.service';
import { Server, Socket } from 'socket.io';

export interface RoomUserList {
  userList: [];
  roomId: string;
  masterId: string;
}

export interface MessageData {
  userId: string;
  targetUserId?: string;
  message: string;
  createTime: number | string;
  isRead?: boolean | number;
  msgId: string;
  roomId?: string;
  user?: User;
}

export interface User {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
}

interface PeerViaSignalingServerData {
  userId: string;
  offer?: RTCSessionDescriptionInit;
  targetUserId: string;
  answer?: RTCSessionDescriptionInit;
}

interface RoomChatData {
  roomId: string;
  userId: string;
  message: MessageData;
}

interface UserInfo {
  nickname: string;
  username: string;
  avatar: string;
  id: string;
  roomId: string;
}

interface RoomChatRequestData {
  roomId: string;
  userId: string;
  message: UserInfo;
}

interface Result {
  status: string;
  message: string;
}

interface SubscribeResult {
  event: string;
  data: Result;
}

interface sendMessageIsReadProps {
  userId;
  targetId;
}

interface friendIsOnlineProps {
  friendList: string[];
}

@WebSocketGateway(5001, { transport: ['websocket'] })
export class WsStartGateway {
  constructor(
    private readonly msgService: MsgService,
    private readonly friendService: FriendService,
    private readonly groupService: GroupService,
    private readonly groupMsgService: GroupMsgService,
  ) {}

  @WebSocketServer()
  server: Server;

  map: Map<string, Socket> = new Map();
  socketMap: Map<Socket, string> = new Map();

  @SubscribeMessage('singleChat')
  singleChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageData,
  ): SubscribeResult {
    console.log('接收到的消息\n', data);
    if (!this.map.has(data.userId)) {
      this.map.set(data.userId, client);
    }
    if (this.map.has(data.targetUserId)) {
      const targetClient = this.map.get(data.targetUserId);
      //进行消息的转发
      targetClient.emit('receiveSingleMessage', JSON.stringify(data));
      // 数据库存储消息
      this.msgService.saveFriendMessage(data);
      return {
        event: 'receiveStatus',
        data: {
          message: 'successful receive',
          status: 'ok',
        },
      };
    } else {
      // 数据库存储消息
      this.msgService.saveFriendMessage(data);
      return {
        event: 'receiveStatus',
        data: {
          message: 'other has off-line',
          status: 'fail',
        },
      };
    }
  }
  //可能出现发送多次connection的情况，需要处理
  @SubscribeMessage('connection')
  async Connection(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageData,
  ): Promise<SubscribeResult> {
    console.log(data);
    if (!this.map.has(data.userId)) {
      this.socketMap.set(client, data.userId);
      this.map.set(data.userId, client);

      // 告诉用户在线的好友，当前用户上线了
      const friendsList = await this.friendService.findAllFriend(data.userId);
      for (const friend of friendsList) {
        const socket = this.map.get(friend);
        //如果当前好友在线，通知他
        if (socket) {
          socket.emit('updateFriendOnlineStatus', {
            id: data.userId,
            isOnline: true,
          });
        }
      }

      //用户上线了，就进入各个用户所在的群聊房间
      const roomList = await this.groupService.queryUserGroupList(data.userId);
      for (const room of roomList) {
        client.join(room.roomId);
      }

      return {
        event: 'receiveStatus',
        data: {
          message: 'online successful',
          status: 'ok',
        },
      };
    }
    return {
      event: 'receiveStatus',
      data: {
        message: 'has online',
        status: 'faile',
      },
    };
  }
  //当用户离开时触发
  @SubscribeMessage('disconnecting')
  async disconnecting(@ConnectedSocket() client: Socket) {
    console.log(client.id);
    // 通知该用户的好友该用户已经下线
    const userId = this.socketMap.get(client);
    const friendsList = await this.friendService.findAllFriend(userId);
    for (const friend of friendsList) {
      const socket = this.map.get(friend);
      // 如果当前好友在线，通知好友该用户要下线了
      if (socket) {
        socket.emit('updateFriendOnlineStatus', {
          id: userId,
          isOnline: false,
        });
      }
    }

    // 用户从各个群聊房间中退出
    const roomList = await this.groupService.queryUserGroupList(userId);
    for (const room of roomList) {
      client.leave(room.roomId);
    }

    // 将该用户的消息从map中删除
    console.log(this.map.delete(this.socketMap.get(client)));
    this.socketMap.delete(client);
  }

  @SubscribeMessage('OfferToVideoChat')
  OfferToVideoChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerViaSignalingServerData,
  ) {
    if (this.map.has(data.targetUserId)) {
      this.map
        .get(data.targetUserId)
        .emit('ReceiveVideoChatOffer', JSON.stringify(data));
    }
    return {
      event: 'receiveStatus',
      data: {
        message: 'online successful',
        status: 'ok',
      },
    };
  }

  @SubscribeMessage('answerToVideoChat')
  answerToVideoChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerViaSignalingServerData,
  ) {
    if (this.map.has(data.targetUserId)) {
      this.map.get(data.targetUserId).emit(
        'ReceiveVideoChatAnswer',
        JSON.stringify({
          ...data,
        }),
      );
    }
    return {
      event: 'receiveStatus',
      data: {
        message: 'online successful',
        status: 'ok',
      },
    };
  }

  @SubscribeMessage('candidateToVideoChat')
  candidateToVideoChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerViaSignalingServerData,
  ) {
    console.log('candidate', data);
    if (this.map.has(data.targetUserId)) {
      this.map
        .get(data.targetUserId)
        .emit('ReceiveVideoChatCandidate', JSON.stringify(data));
    }
    return {
      event: 'receiveStatus',
      data: {
        message: 'online successful',
        status: 'ok',
      },
    };
  }

  @SubscribeMessage('sendMessageHasRead')
  sendMessageHasRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: sendMessageIsReadProps,
  ) {
    console.log(data);
    if (this.map.has(data.targetId)) {
      this.map.get(data.targetId).emit('receiveMessageHasRed', data);
    }
  }

  @SubscribeMessage('friendIsOnline')
  friendIsOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: friendIsOnlineProps,
  ) {
    console.log('获取好友在线情况', data);
    const friendsIsOnlineList = [];
    for (const item of data.friendList) {
      if (this.map.has(item)) {
        friendsIsOnlineList.push({
          id: item,
          isOnline: true,
        });
      } else {
        friendsIsOnlineList.push({
          id: item,
          isOnline: false,
        });
      }
    }
    return {
      event: 'receiveFriendIsOnline',
      data: {
        friendsIsOnlineList,
      },
    };
  }
  // 关闭视频通话
  @SubscribeMessage('closeVideoChat')
  closeVideoChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerViaSignalingServerData,
  ) {
    if (this.map.has(data.targetUserId)) {
      this.map.get(data.targetUserId).emit('receiveCloseVideoChat');
    }
  }

  //开始视频通话
  @SubscribeMessage('startVideoChat')
  startVideoChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerViaSignalingServerData,
  ) {
    if (this.map.has(data.targetUserId)) {
      this.map.get(data.targetUserId).emit('receiveStartVideoChat', data);
    }
  }

  // 接受视频通话
  @SubscribeMessage('isReceiveVideoCall')
  isReceiveVideoCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PeerViaSignalingServerData,
  ) {
    if (this.map.has(data.targetUserId)) {
      this.map.get(data.targetUserId).emit('ReceiveVideoCall', data);
    }
  }

  // 进入群聊
  // 某人加入该群聊时触发
  @SubscribeMessage('joinRoomChat')
  async joinRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatRequestData,
  ) {
    // 删除申请记录
    await this.groupService.deleteGroupRequest({
      userId: data.userId,
      roomId: data.roomId,
    });

    // 判断申请加入群的成员是否已经在群中
    const userList = await this.groupService.queryGroupUser(data.roomId);
    for (const item of userList) {
      if (item.userId === data.userId) {
        return;
      }
    }

    // 系统帮用户生成一条入群通知消息
    const joinGroupMessage = {
      userId: data.userId,
      message: `大家好呀，我是${data.message.nickname},很高兴来到这里`,
      createTime: Date.now(),
      msgId: '',
      roomId: data.roomId,
      user: data.message,
    };

    //将入群消息存到数据库
    await this.groupService.joinGroup(data.roomId, data.userId);
    client.to(data.roomId).emit('receiveMemberAddGroup', data.message); // 告诉群里其它人有人进群了
    client.emit('receiveMemberAddGroup', data.message); // 告诉群主自己有人进群了

    const message = await this.groupMsgService.saveGroupMsg(joinGroupMessage);
    client.to(data.roomId).emit('receiveRoomMessage', message); //以群消息的方式通知群里的人
    client.emit('receiveRoomMessage', message); // 通知自己
    // 如果这个人当前正在线
    if (this.map.has(data.userId)) {
      const socket = this.map.get(data.userId);
      socket.join(data.roomId); //把人拉进群聊
      const room = await this.groupService.queryRoomInfo(data.roomId);
      socket.emit('receiveAddGroup', room); // 告诉这个人已经进群了，让它把新群加到本地
    }
  }

  // 创建群聊
  @SubscribeMessage('createRoomChat')
  async createRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomUserList,
  ) {
    const room = await this.groupService.queryRoomInfo(data.roomId);
    client.join(data.roomId);
    client.emit('receiveAddGroup', room);
    console.log(data.userList);
    for (const userId of data.userList) {
      if (this.map.has(userId)) {
        const socket = this.map.get(userId);
        socket.join(data.roomId);
        socket.emit('receiveAddGroup', room);
      }
    }
  }

  // 退群了，离开群聊
  @SubscribeMessage('leaveRoomChat')
  async leaveRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatData,
  ) {
    //todo  告诉群主有用户退群了
    // 数据库删掉用户群关系
    await this.groupService.leaveGroup(data.roomId, data.userId);
    //告诉其它用户该用户退出群聊
    client.to(data.roomId).emit('receiveMemberSignOutGroup', data);
    client.leave(data.roomId);
    return {
      event: 'receiveSignOutGroup',
      data: data.roomId,
    };
  }

  // 解散群聊
  @SubscribeMessage('dissolutionRoomChat')
  async dissolutionRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatData,
  ) {
    // 删除数据库
    await this.groupService.removeGroup(data.roomId);
    client.to(data.roomId).emit('receiveSignOutGroup', data.roomId);
    client.leave(data.roomId);
    return {
      event: 'receiveSignOutGroup',
      data: data.roomId,
    };
  }

  // 发送群聊消息
  @SubscribeMessage('sendRoomChat')
  async sendRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatData,
  ) {
    const message = await this.groupMsgService.saveGroupMsg(data.message);
    client.to(data.roomId).emit('receiveRoomMessage', message);
    return {
      event: 'receiveRoomMessage',
      data: message,
    };
  }
}
