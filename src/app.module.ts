// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
//import { mongoConfig } from './mongo.config';
import { ProductsModule } from './products/products.module';
import { SoldItemsModule } from './sold/sold.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nci'),
    AuthModule,
    UsersModule,
    ItemsModule,
    ProductsModule,
    SoldItemsModule,
    
  ],
})
export class AppModule {}
