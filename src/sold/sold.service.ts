import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoldItem, SoldItemDocument } from './sold.model';

@Injectable()
export class SoldItemsService {
  constructor(@InjectModel(SoldItem.name) private soldItemModel: Model<SoldItemDocument>) {}

  async create_sold(itemName: string ,productId: string): Promise<SoldItem> {
    const newItem = new this.soldItemModel({ itemName, productId });
    return newItem.save();
  }
  async findByProductId(productId: string): Promise<SoldItem[]> {
    return this.soldItemModel.find({ productId }).exec();
  }
}
