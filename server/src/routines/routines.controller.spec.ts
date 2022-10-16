import { Test, TestingModule } from '@nestjs/testing';
import { RoutineController } from './routines.controller';
import { RoutinesService } from './routines.service';

describe('RoutineController', () => {
  let controller: RoutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineController],
      providers: [RoutinesService],
    }).compile();

    controller = module.get<RoutineController>(RoutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
