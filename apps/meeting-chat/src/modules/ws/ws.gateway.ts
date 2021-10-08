import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Data {
  userId: string;
  targetUserId: string;
  message: string;
  date: string;
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
    @MessageBody() data: Data,
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

  @SubscribeMessage('connection')
  Connection(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Data,
  ): SubscribeResult {
    console.log(data);
    this.socketMap.set(client, data.userId);
    if (!this.map.has(data.userId)) {
      this.map.set(data.userId, client);
    }
    return {
      event: 'receiveStatus',
      data: {
        message: 'online successful',
        status: 'ok',
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
}
