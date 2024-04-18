import { Test, TestingModule } from '@nestjs/testing';
import { SoldItemsService } from './sold.service';

describe('SoldService', () => {
  let service: SoldItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldItemsService],
    }).compile();

    service = module.get<SoldItemsService>(SoldItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
