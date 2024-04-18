import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

class CreateProductDto {
    productId: string;
    amount: number;
    amountAlert: number;
  }
  
  class UpdateProductDto {
    amount: number;
    amountAlert: number;
  }


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':productId')
  async getProductById(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.getProductById(productId);
  }

  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string): Promise<void> {
    return this.productsService.deleteProduct(productId);
  }
}
