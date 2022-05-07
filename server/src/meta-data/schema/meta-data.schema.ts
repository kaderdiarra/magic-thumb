import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetaDataDocument = MetaData & Document;

@Schema()
export class MetaData {
  @Prop({ required: true })
  mediaId: string;

  @Prop({ required: true })
  videoDuration: number;

  @Prop({ required: true })
  shortcode: string;

  @Prop(
    raw({
      username: { type: String, require: true },
      profilePicUrl: { type: String, require: true },
    }),
  )
  owner: Record<string, any>;

  @Prop({ required: true })
  caption: string;

  @Prop({ required: true })
  referenceUrl: string;

  @Prop({ required: true })
  videoUrlToInstagram: string;
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
