import { Controller, Get, Param } from '@nestjs/common';
import { SoldItemsService } from './sold.service';

@Controller('sold-items')
export class SoldItemsController {
  constructor(private readonly soldItemsService: SoldItemsService) {}

  @Get(':productId')
  async findByProductId(@Param('productId') productId: string) {
    return this.soldItemsService.findByProductId(productId);
  }
}
