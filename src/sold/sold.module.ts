// sold-items.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoldItemsController } from './sold.controller';
import { SoldItemsService } from './sold.service';
import { SoldItem, SoldSchema } from './sold.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: SoldItem.name, schema: SoldSchema }])],
  controllers: [SoldItemsController],
  providers: [SoldItemsService],
  exports:[SoldItemsService],
})
export class SoldItemsModule {}
