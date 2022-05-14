import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  constructor(private readonly ampqConnection: AmqpConnection) {}

  async publish<T>(
    exchange: string,
    routingKey: string,
    payload: T,
    options?: any,
  ): Promise<void> {
    await this.ampqConnection.publish(exchange, routingKey, payload, options);

    console.log('send message');
  }
}
