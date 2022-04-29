import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MetaData, MetaDataDocument } from './schema/meta-data.schema';
import { CreateMetaDataDto } from './dto/create-meta-data.dto';

@Injectable()
export class MetaDataService {
  constructor(
    @InjectModel(MetaData.name) private MetaDataModel: Model<MetaDataDocument>,
  ) {}

  async create(dto: CreateMetaDataDto): Promise<MetaData> {
    const metaData = new this.MetaDataModel(dto);
    return metaData.save();
  }

  async findAll(): Promise<MetaData[]> {
    return await this.MetaDataModel.find().exec();
  }

  async findOne(id: number): Promise<MetaData> {
    return await this.MetaDataModel.findById(id).exec();
  }

  async update(id: number, dto: MetaData): Promise<MetaData> {
    return await this.MetaDataModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async remove(id: number): Promise<MetaData> {
    return await this.MetaDataModel.findByIdAndRemove(id).exec();
  }
}
