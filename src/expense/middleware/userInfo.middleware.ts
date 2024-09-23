import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
const geoip = require('geoip-lite');

@Injectable()
export class userInfo implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const geo = geoip.lookup(req.ip);
    console.log(geo?.country, geo?.city, req.ip);
    next();
  }
}
