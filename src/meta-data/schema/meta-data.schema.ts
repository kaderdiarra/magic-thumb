import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetaDataDocument = MetaData & Document;

@Schema()
export class MetaData {
  @Prop({ required: true })
  videoUrl: number;

  @Prop({ required: true })
  mediaId: string;

  @Prop({ required: true })
  videoDuration: number;

  @Prop({ required: true })
  shortcode: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  videoPath: string;

  @Prop({ required: true })
  caption: string;
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
