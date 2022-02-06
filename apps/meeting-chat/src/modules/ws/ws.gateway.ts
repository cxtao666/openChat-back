import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FriendService } from 'apps/meeting/src/modules/friend/friend.service';
import { MsgService } from 'apps/meeting/src/modules/msg/msg.service';
import { Server, Socket } from 'socket.io';

export interface MessageData {
  userId: string;
  targetUserId?: string;
  message: string;
  createTime: number | string;
  isRead: boolean | number;
  msgId: string;
  roomId?: string;
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

  // 上线了，加入群聊
  @SubscribeMessage('joinRoomChat')
  joinRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatData,
  ) {
    client.join(data.roomId);
  }

  // 下线了，离开群聊
  @SubscribeMessage('leaveRoomChat')
  leaveRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatData,
  ) {
    client.leave(data.roomId);
  }

  // 发送群聊消息
  @SubscribeMessage('sendRoomChat')
  sendRoomChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RoomChatData,
  ) {
    client.to(data.roomId).emit('receiveRoomMessage', data.message);
  }
}
