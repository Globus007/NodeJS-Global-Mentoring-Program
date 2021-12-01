import { NextFunction, Request, Response } from 'express';
import { Logger } from '../components';
import { CustomError, HttpStatusCode } from '../types';
import { ERROR_MESSAGE } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  let statusCode: number;
  let message: string;

  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
  } else {
    statusCode = HttpStatusCode.INTERNAL_SERVER;
    message = ERROR_MESSAGE;
  }

  Logger.error(error);
  res.status(statusCode).send({ message });
};
