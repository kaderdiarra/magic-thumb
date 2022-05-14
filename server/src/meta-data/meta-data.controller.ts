import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagingService } from 'src/messaging/messaging.service';
import { CreateMetaDataDto } from './dto/create-meta-data.dto';
import { MetaDataService } from './meta-data.service';
import { MetaData } from './schema';

@Controller('metadata')
export class MetaDataController {
  constructor(
    private metaDataService: MetaDataService,
    private messagingService: MessagingService,
  ) {}

  @Get('messaging')
  testMessaging() {
    this.messagingService.publish<{ title: string; data: any }>(
      'operation',
      'operation.task',
      { title: 'update_po', data: 'test messaging system' },
    );
  }

  @Get('pagination')
  pagination(@Query('page') page: string) {
    return this.metaDataService.pagination(+page);
  }

  @Post()
  create(@Body() dto: CreateMetaDataDto) {
    return this.metaDataService.create(dto);
  }

  @Get()
  findAll() {
    return this.metaDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metaDataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: MetaData) {
    return this.metaDataService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metaDataService.remove(id);
  }
}
