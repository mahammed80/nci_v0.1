import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SoldItemDocument = SoldItem & Document;

@Schema()
export class SoldItem {
  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  productId: string;
  
  save: () => Promise<SoldItem>;
}

export const SoldSchema = SchemaFactory.createForClass(SoldItem);
