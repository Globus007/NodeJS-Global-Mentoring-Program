import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { promisify } from 'util';
import { AuthorizationError, HttpStatusCode } from '../types';
import { JWT_SECRET } from '../config';
import { Logger } from '../components';

export const verifyJWT = promisify<string, string>(jsonwebtoken.verify);

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/login')) {
    return next();
  }
  checkToken(req, res, next);
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return next(new AuthorizationError());
  }
  try {
    await verifyJWT(String(token), JWT_SECRET);
  } catch (e) {
    Logger.error(e);
    return next(new AuthorizationError('Forbidden', HttpStatusCode.FORBIDDEN));
  }
  next();
};
