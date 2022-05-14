import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller('messaging')
export class MessagingController {
  @RabbitRPC({
    exchange: 'operation', // TODO: get from .env
    routingKey: 'operation.result',
    queue: 'operation_result',
    queueOptions: { durable: false },
  })
  operationResult(msg: object) {
    console.log('🚀 message:', msg);
  }
}
