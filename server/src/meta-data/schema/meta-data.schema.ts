import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
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

  @Prop(
    raw({
      username: { type: String, require: true },
      profilePicUrl: { type: String, require: true },
    }),
  )
  owner: Record<string, any>;

  @Prop({ required: true })
  videoPath: string;

  @Prop({ required: true })
  caption: string;
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
