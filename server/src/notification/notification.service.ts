import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server } from 'socket.io';

@Injectable()
export class NotificationService {
  @WebSocketServer()
  server: Server;

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  identify(dto, clientId: string) {
    console.log(
      '🚀 ~ file: notification.service.ts ~ line 17 ~ NotificationService ~ identify ~ clientId',
      clientId,
    );
    console.log(
      '🚀 ~ file: notification.service.ts ~ line 17 ~ NotificationService ~ identify ~ dto',
      dto,
    );
  }

  testSocket() {
    console.log('MSG EMITED');
    this.server.emit('TEST_SOCKET');
  }
}
