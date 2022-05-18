import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { MessagePayload } from 'src/types';

@Controller('messaging')
export class MessagingController {
  @RabbitRPC({
    exchange: 'operation', // TODO: get from .env
    routingKey: 'operation.result',
    queue: 'operation_result',
    queueOptions: { durable: false },
  })
  operationResult(msg: MessagePayload) {
    console.log(`Receive message with title: [${msg.title}]\n`, {
      data: msg.data,
    });
  }
}
