import express from 'express';
import cors from 'cors';
import { HOSTNAME, PORT } from './config';

const app = express();
app.use(cors());

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Running at ${HOSTNAME}:${PORT}`);
});
