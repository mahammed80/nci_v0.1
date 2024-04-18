import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { Product, ProductSchema } from '../products/products.model';

import { SoldItemsModule } from '../sold/sold.module';
import { SoldItemsService } from '../sold/sold.service';
import { SoldItem, SoldSchema } from '../sold/sold.model';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './item.model'; // Import the Item model



@Module({
  imports: [
    ProductsModule,
    SoldItemsModule,
    MongooseModule.forFeature([{ name: SoldItem.name, schema: SoldSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ProductsService, SoldItemsService , ItemsService],
})
export class ItemsModule {}
