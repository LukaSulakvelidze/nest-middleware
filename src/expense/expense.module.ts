import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { deviceChecker, timeZone, userInfo } from './middleware';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(timeZone, deviceChecker, userInfo)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
