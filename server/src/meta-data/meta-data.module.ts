import { Module } from '@nestjs/common';
import { MetaDataService } from './meta-data.service';
import { MetaDataController } from './meta-data.controller';
import { MetaData, MetaDataSchema } from './schema/meta-data.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagingModule } from 'src/messaging/messaging.module';
import { RabbitModule } from 'src/rabbit/rabbit.module';

@Module({
  imports: [
    RabbitModule,
    MessagingModule,
    MongooseModule.forFeature([
      { name: MetaData.name, schema: MetaDataSchema },
    ]),
  ],
  providers: [MetaDataService],
  controllers: [MetaDataController],
})
export class MetaDataModule {}
