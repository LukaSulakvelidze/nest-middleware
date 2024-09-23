import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import {
  deviceChecker,
  permitionHandler,
  timeZone,
  userInfo,
} from './middleware';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userInfo, deviceChecker, timeZone)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(permitionHandler)
      .forRoutes(
        { path: '*', method: RequestMethod.GET },
        { path: '*', method: RequestMethod.POST },
      );
  }
}
