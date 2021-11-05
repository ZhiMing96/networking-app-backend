import { Test, TestingModule } from '@nestjs/testing';
import { IntroductionService } from './introduction.service';

describe('IntroductionService', () => {
  let service: IntroductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntroductionService],
    }).compile();

    service = module.get<IntroductionService>(IntroductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
