import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { MetaDataModule } from './meta-data/meta-data.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo/mongo.service';
import { RabbitModule } from './rabbit/rabbit.module';
import { MessagingModule } from './messaging/messaging.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    RabbitModule,
    MessagingModule,
    MongoModule,
    MetaDataModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoService,
    }),
    NotificationModule,
  ],
})
export class AppModule {}
