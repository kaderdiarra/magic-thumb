import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongoModule } from './mongo/mongo.module';
import { MetaDataModule } from './meta-data/meta-data.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo/mongo.service';
import { AppService } from './app.service';

@Module({
  imports: [
    MongoModule,
    MetaDataModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoService,
    }),
  ],
  controllers: [AppController], //! remove
  providers: [AppService], //! remove
})
export class AppModule {}
