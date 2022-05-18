import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

  @Get('updateposts')
  @HttpCode(HttpStatus.OK)
  updatePosts() {
    this.messagingService.updatePosts();
  }

  @Delete('removeposts')
  removePosts() {
    return this.messagingService.removePosts();
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
