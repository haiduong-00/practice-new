import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
  });

  // describe('findAll', () => {
  //   it('should return an array of cats ', async () => {
  //     const result = ['test'];
  //     jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
  //     expect(await catsController.findAll()).toBe(result);
  //   });
  // });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });
});
