import { json, Router } from 'express';
import { HttpStatusCode } from '../types';
import { logRouterError } from '../utils';
import { login } from '../services';
import { createValidator } from 'express-joi-validation';
import { LoginSchema } from '../schemas';

export const loginRouter = Router();
const validator = createValidator({});

loginRouter.post('/', json(), validator.body(LoginSchema), async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const token = await login(username, password);
    res.status(HttpStatusCode.OK).send(token);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});
