import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMetaDataDto } from './dto/create-meta-data.dto';
import { MetaDataService } from './meta-data.service';
import { MetaData } from './schema/meta-data.schema';

@Controller('metadata')
export class MetaDataController {
  constructor(private metaDataService: MetaDataService) {}

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
    return this.metaDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: MetaData) {
    return this.metaDataService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metaDataService.remove(+id);
  }
}
