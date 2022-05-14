import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { MessagingController } from 'src/messaging/messaging.controller';
import { MessagingService } from 'src/messaging/messaging.service';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'operation',
          type: 'direct',
          options: {
            durable: false,
          },
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672', // TODO: Get from .env
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    RabbitModule,
  ],
  providers: [MessagingService, MessagingController],
  controllers: [MessagingController],
  exports: [RabbitMQModule],
})
export class RabbitModule {}
