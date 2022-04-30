import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MetaData, MetaDataDocument } from './schema/meta-data.schema';
import { CreateMetaDataDto } from './dto/create-meta-data.dto';
import { ITEMS_PER_PAGE } from 'src/constant';

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

  async findOne(id: string): Promise<MetaData> {
    return await this.MetaDataModel.findById(id);
  }

  async update(id: string, dto: MetaData): Promise<MetaData> {
    return await this.MetaDataModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<MetaData> {
    return await this.MetaDataModel.findByIdAndRemove(id).exec();
  }

  async pagination(page: number): Promise<{
    items: MetaData[];
    pagination: { nbrOfPage: number; nbrOfItem: number };
  }> {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const nbrOfItemPromise = this.MetaDataModel.estimatedDocumentCount();
    const itemsPromise = this.MetaDataModel.find({})
      .skip(skip)
      .limit(ITEMS_PER_PAGE);

    const [items, nbrOfItem] = await Promise.all([
      itemsPromise.exec(),
      nbrOfItemPromise.exec(),
    ]);

    const nbrOfPage = Math.ceil(nbrOfItem / ITEMS_PER_PAGE);

    return { items, pagination: { nbrOfPage, nbrOfItem } };
  }
}
