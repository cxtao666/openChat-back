import { Test, TestingModule } from '@nestjs/testing';
import { ApiGetwayController } from './api-getway.controller';
import { ApiGetWayService } from './api-getway.service';

describe('ApiGetwayController', () => {
  let adminController: ApiGetwayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiGetWayService],
      providers: [ApiGetWayService],
    }).compile();

    adminController = app.get<ApiGetwayController>(ApiGetwayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(adminController.getHello()).toBe('Hello World!');
    });
  });
});
