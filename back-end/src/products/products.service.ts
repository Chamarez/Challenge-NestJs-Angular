import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmptyError } from 'rxjs';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    4;
    const createNewProduct = await this.productModel.create(createProductDto);
    return createNewProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedProduct = await this.productModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return !!deletedProduct;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDTO,
  ): Promise<boolean> {
    if (Object.entries(updateProductDto).length === 0) {
      throw new HttpException(
        'You have to insert one value to update',
        HttpStatus.BAD_REQUEST,
      );
    }
    const response = await this.productModel.findOneAndUpdate(
      { _id: id },
      {
        ...updateProductDto,
      },
    );
    return !!response;
  }
}
