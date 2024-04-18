import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { SoldItemsService } from '../sold/sold.service';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './item.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private readonly productsService: ProductsService,
    private readonly soldItemsService: SoldItemsService,
  ) {}

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async findAll(page: number, limit: number): Promise<Item[]> {
    return this.itemModel.find().skip((page - 1) * limit).limit(limit).exec();
  }

  async findById(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  async findByDate(date: Date): Promise<Item[]> { // Find items with the exact date (optional)
    return await this.itemModel.find({ addedTime: date });
  }

  async findSoldItems(cond: boolean): Promise<Item[]> {
    const query = cond ? { selling: true } : { selling: false };
    return this.itemModel.find(query).exec();
  }
  
  async markAsSold(id: string): Promise<Item> {
    const item = await this.findById(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    item.selling = true;
    try {
    await this.updatingProduct(item);
    await this.soldItemsService.create_sold(item.itemName, item.productId);
    return item.save();
    
    } catch (error) {
      console.error('Error saving item:', error);
      throw error;
    }
    
  }
  private async updatingProduct(item: Item): Promise<void> {
    const product = await this.productsService.getProductById(item.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Calculate sold item amount
    const soldAmount = item.amount;
    const revenue = soldAmount * item.price;

    // Update product's sold_amount and revenue
    product.soldAmount += soldAmount;
    product.revenue += revenue;

    await product.save();
  }
  
}
