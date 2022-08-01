import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/random/')
  async findAllRandom(): Promise<Product[]> {
    return this.productsService.findAllRandom();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDTO,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Get('/index/:id')
  async findWithIndexId(@Param('id') id: string): Promise<Product[]> {
    return this.productsService.findByIndexId(id);
  }

}
