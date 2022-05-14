import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { MessagePayload } from 'src/types';

@Injectable()
export class MessagingService {
  constructor(private readonly ampqConnection: AmqpConnection) {}

  async publish(
    exchange: string,
    routingKey: string,
    payload: MessagePayload,
    options?: any,
  ): Promise<void> {
    this.ampqConnection.publish(exchange, routingKey, payload, options);

    console.log(`Send message with title: [${payload.title}]`);
  }
}
