import express from 'express';
import cors from 'cors';
import { HOSTNAME, PORT } from './config';
import { groupRouter, loginRouter, userGroupRouter, userRouter } from './routes';
import { checkToken, errorHandlerMiddleware, loggerMiddleware } from './middlewares';
import { Logger } from './components';
import { HttpStatusCode } from './types';

const app = express();
app.use(cors());
app.use(loggerMiddleware);

app.use('/login/', loginRouter);
app.use('/user/', checkToken, userRouter);
app.use('/group/', checkToken, groupRouter);
app.use('/user-group/', checkToken, userGroupRouter);
app.use(errorHandlerMiddleware);

app.get('*', (req, res) => {
  res.sendStatus(HttpStatusCode.NOT_FOUND);
});

app.listen(PORT, () => {
  Logger.debug(`Running at ${HOSTNAME}:${PORT}`);
});

process.on('unhandledRejection', (error) => {
  Logger.error(error);
});

process.on('uncaughtException', (error) => {
  Logger.error(error);
  process.exit(1);
});
