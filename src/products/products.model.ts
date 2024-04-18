import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  productId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 0 })
  soldAmount: number;

  @Prop({ required: true })
  amountAlert: number;

  @Prop({ default: 0 })
  revenue: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
