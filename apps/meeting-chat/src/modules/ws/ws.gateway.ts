import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface MessageData {
  userId: string;
  targetUserId: string;
  message: string;
  date: string;
}

interface PeerViaSignalingServerData {
  userId: string;
  offer?: RTCSessionDescriptionInit;
  targetUserId: string;
  answer?: RTCSessionDescriptionInit;
}

interface Result {
  status: string;
  message: string;
}

interface SubscribeResult {
  event: string;
  data: Result;
}

@WebSocketGateway(5001, { transport: ['websocket'] })
export class WsStartGateway {
  @WebSocketServer()
  server: Server;

  map: Map<string, Socket> = new Map();
  socketMap: Map<Socket, string> = new Map();

  @SubscribeMessage('singleChat')
  singleChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageData,
  ): SubscribeResult {
    console.log(data);
    if (!this.map.has(data.userId)) {
      this.map.set(data.userId, client);
    }
    if (this.map.has(data.targetUserId)) {
      const targetClient = this.map.get(data.targetUserId);
      targetClient.emit('receiveSingleMessage', JSON.stringify(data));
      return {
        event: 'receiveStatus',
        data: {
          message: 'successful receive',
          status: 'ok',
        },
      };
    } else {
      return {
        event: 'receiveStatus',
        data: {
          message: 'other has off-line',
          status: 'fail',
        },
      };
    }
  }
  //可能出现发送多次 connection的情况，需要处理
  @SubscribeMessage('connection')
  Connection(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageData,
  ): SubscribeResult {
    console.log(data);
    if (!this.map.has(data.userId)) {
      this.socketMap.set(client, data.userId);
      this.map.set(data.userId, client);
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
  disconnecting(@ConnectedSocket() client: Socket) {
    console.log(client.id);
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
}
