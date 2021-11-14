import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { HOSTNAME, PORT } from './config';
import { groupRouter, userRouter } from './routes';

const app = express();
app.use(morgan('tiny'));
app.use(cors());

app.use('/user/', userRouter);
app.use('/group/', groupRouter);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Running at ${HOSTNAME}:${PORT}`);
});
