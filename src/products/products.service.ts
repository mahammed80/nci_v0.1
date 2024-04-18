import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.model';
import { Item } from '../items/item.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async createOrUpdateProduct(item: Item): Promise<Product> {
    let product = await this.productModel.findOne({ productId: item.productId }).exec();
    
    // If product does not exist, create a new one
    if (!product) {
      product = new this.productModel({
        productId: item.productId,
        amount: item.amount,
        amountAlert: 10,
      });
    } else {
      // If product exists, update the amount
      product.amount += item.amount;
    }
    
    // Save the product to the database
    await product.save();
    
    return product;
  }

  async getProductById(productId: string): Promise<Product> {
    return this.productModel.findOne({ productId }).exec();
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getAmountAlertProducts(): Promise<Product[]> {
    return this.productModel.find({ amount: { $lte: { $amountAlert: 10 } } }).exec();
  }

  async updateProduct(productId: string, updateProductDto: Partial<Product>): Promise<Product> {
    return this.productModel.findOneAndUpdate({ productId }, updateProductDto, { new: true }).exec();
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.productModel.deleteOne({ productId }).exec();
  }
}
