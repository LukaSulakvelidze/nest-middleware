import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

Injectable();
export class permitionHandler implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['permition'] === 'read' && req.method === 'GET') {
      next();
    } else if (req.headers['permition'] === 'create' && req.method === 'POST') {
      next();
    } else {
      throw new HttpException('Permition is required', HttpStatus.FORBIDDEN);
    }
  }
}
