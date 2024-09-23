import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import DeviceDetector = require('device-detector-js');

Injectable();
export class deviceChecker implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const deviceDetector = new DeviceDetector();
    const userAgent = req.headers['user-agent'];
    const device = deviceDetector.parse(userAgent);
    if (device.device?.type === 'desktop') next();
    else {
      throw new HttpException(
        'Device is not supported',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
