import { NextFunction, Request, Response } from 'express';
import { createErrorResponse, createSuccessResponse } from '../Utils/Router';
import OnRepeatException from '../Exception/OnRepeatException';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof OnRepeatException) {
    // TODO process repeater hops
    const dto = err.getDto();
    dto.setRepeater(err.getInterval(), err.getMaxHops());
    createSuccessResponse(res, dto);
    next();
    return;
  }

  createErrorResponse(req, res, err);
  next();
}
