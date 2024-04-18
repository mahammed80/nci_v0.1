import { Controller, Get, Post, Body, Query, ParseIntPipe, UsePipes, BadRequestException ,ValidationPipe, Param,NotFoundException} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { ItemsService } from './items.service';
import { Item } from './item.model';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly itemsService: ItemsService , 
    ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() item: Item): Promise<Item> {
    await this.productsService.createOrUpdateProduct(item);
    return this.itemsService.create(item);
  }

  @Get()
  async findAll(@Query('page', ParseIntPipe) page: number = 1, @Query('limit', ParseIntPipe) limit: number = 10): Promise<Item[]> {
    return this.itemsService.findAll(page, limit);
  }
  
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Item> {
    const item = await this.itemsService.findById(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  @Get('by-date/:date')
  async findByDate(@Param('date') dateStr: string): Promise<Item[]> {
    const date = new Date(dateStr); // Assuming ISO 8601 format
    return await this.itemsService.findByDate(date);
  }
  @Get('sold_items')
  async findSoldItems(@Query('cond') cond: boolean): Promise<Item[]> {
    if (cond === undefined || typeof cond !== 'boolean') {
      throw new BadRequestException('Invalid condition value');
    }
    return this.itemsService.findSoldItems(cond);
  }
  
  @Post('selling/:id')
  async markAsSold(@Param('id') id: string): Promise<Item> {
    return this.itemsService.markAsSold(id);
  }

  
}
