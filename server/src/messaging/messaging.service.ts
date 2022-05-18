import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePayload } from 'src/types';

@Injectable()
export class MessagingService {
  constructor(
    private config: ConfigService,
    private readonly ampqConnection: AmqpConnection,
  ) {}

  async publish(
    exchange: string,
    routingKey: string,
    payload: MessagePayload,
    options?: any,
  ): Promise<void> {
    this.ampqConnection.publish(exchange, routingKey, payload, options);

    console.log(`Send message with title: [${payload.title}]`); // TODO: use log system
  }

  async updatePosts(): Promise<void> {
    const exchange = this.config.get<string>('EXCHANGE_NAME');
    const routingKey = exchange + '.task';
    const payload: MessagePayload = {
      title: 'update_posts',
      data: {
        username: this.config.get<string>('USERNAME'),
        password: this.config.get<string>('PASSWORD'),
      },
    };
    await this.publish(exchange, routingKey, payload);
  }

  removePosts() {
    return 'not implemented yet';
  }
}
