import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  @SubscribeMessage('CONNECTION') // receive client token and verify then establish connection
  connection(@MessageBody() connectionDto, @ConnectedSocket() client: Socket) {
    return this.notificationService.identify(connectionDto, client.id);
  }

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }
}
