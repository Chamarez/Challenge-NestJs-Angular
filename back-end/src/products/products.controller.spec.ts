import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreateProductDto } from './dto/create.product.dto';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  const createProductDto: CreateProductDto = {
    title: 'Car',
    description: 'toy for childrens',
    price: 11,
    stock: 44,
    weight: 32,
    size: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Function create()', () => {
    it('should create a new product', async () => {
      const createSpy = jest.spyOn(service, 'create');

      await controller.create(createProductDto);
      expect(createSpy).toBeCalled();
      expect(createSpy).toBeCalledTimes(1);
    });
  });

  describe('function findAll', () => {
    it('find all objects', async () => {
      const spy = jest.spyOn(service, 'findAll');

      await controller.findAll();
      expect(spy).toBeCalled();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('function findOne', () => {
    it('find one object', async () => {
      const spy = jest.spyOn(service, 'findOne');

      await controller.findOne('1221212112');
      expect(spy).toBeCalled();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('function delete', () => {
    it('delete one object', async () => {
      const spy = jest.spyOn(service, 'delete');

      await controller.delete('1221212112');
      expect(spy).toBeCalled();
      expect(spy).toBeCalledTimes(1);
    });
  });
});
