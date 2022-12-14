import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {
  Product,
  ProductDocument,
  ProductsSchema,
} from './schemas/product.schema';
import { rootMongooseTestModule } from '../utils/MongooseTestModule';
import { ProductsController } from './products.controller';
import mongoose, { Model } from 'mongoose';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';
import { Index, IndexSchema, IndexDocument } from './schemas/index.schema';

describe('ProductsService', () => {
  let service: ProductsService;
  let ProductModel = Model<Product>;
  let IndexModel = Model<Index>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Product', schema: ProductsSchema },
          { name: 'Index', schema: IndexSchema },
        ]),
      ],
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product.name'),
          useValue: Model,
        },
        {
          provide: getModelToken('Index.name'),
          useValue: Model,
        },
      ],
    }).compile();
    ProductModel = module.get<Model<ProductDocument>>(
      getModelToken(Product.name),
    );
    IndexModel = module.get<Model<IndexDocument>>(getModelToken(Index.name));
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('function create', () => {
    it('create one object', async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };
      const response = await service.create(item);
      expect(response.toObject().price).toEqual(item.price);
      expect(response.stock).toEqual(item.stock);
    });
  });

  describe('function findAll', () => {
    beforeEach(async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };
      const secondItem = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };
      await ProductModel.create(item);
      await ProductModel.create(secondItem);
    });

    it('find all objects', async () => {
      const response = await service.findAll();
      expect(response).toBeDefined();
      expect(Object.keys(response).length).toBe(2);
    });
  });

  describe('function getById', () => {
    beforeEach(async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };

      const product = await ProductModel.create(item);
    });

    it('find one objects', async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };

      const product = await ProductModel.create(item);

      const response = await service.findOne(product._id);
      expect(response).toBeDefined();
      expect(response.title).toBe(product.title);
    });
  });

  it('delete one objects', async () => {
    const item = {
      title: 'Auto',
      description: 'string',
      price: 11,
      stock: 44,
      weight: 32,
      size: 1,
    };

    const product = await ProductModel.create(item);

    const response = await service.delete(product._id);

    expect(response).toBeDefined();
    expect(response).toBe(true);
  });

  it('update one objects', async () => {
    const item = {
      title: 'Auto',
      description: 'string',
      price: 11,
      stock: 44,
      weight: 32,
      size: 1,
    };
    const secondItem = {
      title: 'Auto',
      description: 'string',
      price: 11,
      stock: 44,
      weight: 32,
      size: 1,
    };

    const product = await ProductModel.create(item);

    const response = await service.update(product._id, secondItem);

    expect(response).toBeDefined();
    expect(response).toBe(true);
  });

  it('update one objects without value', async () => {
    const item = {
      title: 'Auto',
      description: 'string',
      price: 11,
      stock: 44,
      weight: 32,
      size: 1,
    };
    const secondItem = {};

    const product = await ProductModel.create(item);
    try {
      await service.update(product._id, secondItem);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toBe('You have to insert one value to update');
    }
  });

  describe('function finall random', () => {
    beforeEach(async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };
      const secondItem = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };
      await ProductModel.create(item);
      await ProductModel.create(secondItem);
    });

    it('find all objects', async () => {
      const response = await service.findAllRandom();
      expect(response).toBeDefined();
      expect(Object.keys(response).length).toBe(2);
    });
  });

  describe('function getById', () => {
    beforeEach(async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };

      const product = await ProductModel.create(item);
    });

    it('find one objects', async () => {
      const item = {
        title: 'Auto',
        description: 'string',
        price: 11,
        stock: 44,
        weight: 32,
        size: 1,
      };

      const product = await ProductModel.create(item);
      const productRandom = await ProductModel.find(item).exec();

      const index: string[] = productRandom.map((x) => x._id.toHexString());
      const { _id } = await IndexModel.create({
        indexById: index,
      });
      const response = await service.findByIndexId(_id);
      expect(_id).toBeDefined();
    });
  });
});
