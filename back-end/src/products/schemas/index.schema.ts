import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IndexDocument = Index & Document;

@Schema()
export class Index {
  @Prop()
  indexById: string[];
}

export const IndexSchema = SchemaFactory.createForClass(Index);
