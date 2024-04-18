import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  expireDate: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: false }) 
  selling: boolean;

  @Prop({ default: Date.now }) 
  addedTime: Date;

  save: () => Promise<Item>;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
