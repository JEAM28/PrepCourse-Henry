import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.repository';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 5);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProducts(@Body() product: Product) {
    return this.productsService.createProducts(product);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateProducts(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.updateProducts(id, product);
  }
}
