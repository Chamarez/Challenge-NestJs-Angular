import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create.product.dto';
import { FindRandomsDto } from './dto/findRandoms.dto';
import { GetProductsResponseDto } from './dto/getProducts.response.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { Index } from './schemas/index.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('Index')
    private readonly indexModel: Model<Index>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    4;
    const createNewProduct = await this.productModel.create(createProductDto);
    return createNewProduct;
  }

  async findAll(): Promise<GetProductsResponseDto[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<GetProductsResponseDto> {
    return this.productModel.findOne({ _id: id }).catch(() => {
      throw new BadRequestException('Not found');
    });
  }

  async delete(id: string) {
    const deletedProduct = await this.productModel
      .findByIdAndRemove({ _id: id })
      .exec()
      .catch(() => {
        throw new BadRequestException('Not found');
      });
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
    const response = await this.productModel
      .findOneAndUpdate(
        { _id: id },
        {
          ...updateProductDto,
        },
      )
      .catch(() => {
        throw new BadRequestException('Not found');
      });
    return !response;
  }

  async findAllRandom(): Promise<FindRandomsDto> {
    let productRandom = await this.productModel.find().exec();
    productRandom = productRandom.sort(() => (Math.random() > 0.5 ? 1 : -1));

    const index: string[] = productRandom.map((x) => x._id.toHexString());

    const { _id } = await this.indexModel.create({ indexById: index });
    return {
      products: productRandom,
      index: _id.toHexString(),
    };
  }

  async findByIndexId(indexId: string): Promise<GetProductsResponseDto[]> {
    const { indexById } = await this.indexModel
      .findOne({
        _id: indexId,
      })
      .catch(() => {
        throw new BadRequestException('Not found');
      });
    const productList = await this.productModel
      .find({
        _id: {
          $in: indexById,
        },
      })
      .catch(() => {
        throw new BadRequestException('Not found');
      });
    const ordered = [];
    for (let i = 0; i < indexById.length; i++) {
      for (let j = 0; j < productList.length; j++) {
        if (indexById[i] == productList[j]._id.toHexString()) {
          ordered.push(productList[j]);
        }
      }
    }
    return ordered;
  }
}
