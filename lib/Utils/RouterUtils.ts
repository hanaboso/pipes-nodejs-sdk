import { Request, Response } from 'express';
import ProcessDTO from './ProcessDTO';
import logger from '../Logger/Winston';

interface ErrorResponse {
  result: string;
  message: string;
}

export function formatError(e: Error): ErrorResponse {
  return { result: 'error', message: e.message };
}

export function createErrorResponse(res: Response, e?: Error): void {
  if (e) {
    logger.error(`Error occurred: ${e.message}`);
    res.status(400);
    res.json(formatError(e));
  } else {
    logger.error('Error occurred: unknown reason');
    res.status(500);
    res.json({ error: 'Unknown error occurred.' });
  }
}

export function createSuccessResponse(res: Response, dto: ProcessDTO): void {
  res.status(200);
  res.flushHeaders();

  Object.entries(dto.getHeaders()).forEach(([key, value]) => {
    res.setHeader(key, String(value));
  });
  res.send(dto.getBody());
}

export function createProcessDTO(req: Request): ProcessDTO {
  return new ProcessDTO(req.body, req.headers);
}
