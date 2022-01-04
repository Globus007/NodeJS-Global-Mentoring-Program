import express from 'express';
import cors from 'cors';
import { HOSTNAME, PORT } from './config';
import { groupRouter, loginRouter, userGroupRouter, userRouter } from './routes';
import { authorizationMiddleware, errorHandlerMiddleware, loggerMiddleware } from './middlewares';
import { Logger } from './components';
import { HttpStatusCode } from './types';

export const app = express();
app.use(cors());
app.use(loggerMiddleware);
app.use(authorizationMiddleware);

app.use('/login/', loginRouter);
app.use('/user/', userRouter);
app.use('/group/', groupRouter);
app.use('/user-group/', userGroupRouter);
app.use(errorHandlerMiddleware);

app.get('*', (req, res) => {
  res.sendStatus(HttpStatusCode.NOT_FOUND);
});

export const server = app.listen(PORT, () => {
  Logger.debug(`Running at ${HOSTNAME}:${PORT}`);
});

process.on('unhandledRejection', (error) => {
  Logger.error(error);
});

process.on('uncaughtException', (error) => {
  Logger.error(error);
  process.exit(1);
});
