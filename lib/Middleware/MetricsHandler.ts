import { NextFunction, Request, Response } from 'express';
import logger from '../Logger/Logger';

function afterResponse(res: Response, next: NextFunction) {
  res.removeListener('finish', afterResponse);
  res.removeListener('close', afterResponse);

  // action after response
  logger.info('EndTime:');
  next();
}
export default function metricsHandler(req: Request, res: Response, next: NextFunction): void {
  // TODO: implement metrics
  res.on('finish', afterResponse);
  res.on('close', afterResponse);

  // action before request
  // eventually calling `next()`

  logger.info('StartTime:');
  next();
}
