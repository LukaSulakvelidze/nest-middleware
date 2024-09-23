import {
  HttpException,
  Injectable,
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

Injectable();
export class timeZone implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date().getHours();
    if (date > 10 && date < 18) next();
    else {
      throw new HttpException(
        'Time zone is not available',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
