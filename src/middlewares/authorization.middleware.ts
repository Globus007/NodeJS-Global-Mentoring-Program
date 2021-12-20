import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthorizationError, HttpStatusCode } from '../types';
import { JWT_SECRET } from '../config';
import { Logger } from '../components';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    throw new AuthorizationError();
  }
  jsonwebtoken.verify(String(token), JWT_SECRET, (error) => {
    if (error) {
      Logger.error(error);
      throw new AuthorizationError('Forbidden', HttpStatusCode.FORBIDDEN);
    }
  });
  next();
};
