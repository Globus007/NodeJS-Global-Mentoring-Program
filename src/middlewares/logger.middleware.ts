import { NextFunction, Request, Response } from 'express';
import { Logger } from '../components';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, path, query, body } = req;
  Logger.info('loggerMiddleware', { method, path, query, body });
  next();
};
