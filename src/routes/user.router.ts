import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserSchema } from '../schemas';
import { userService } from '../services';
import { HttpStatusCode, User } from '../types';
import { UserCreationAttributes } from '../db/models';
import { logRouterError } from '../utils';

export const userRouter = Router();
const validator = createValidator({});

userRouter.get('/', async (req, res, next) => {
  const { loginSubstring, limit } = req.query;
  try {
    const users = loginSubstring
      ? await userService.getAutoSuggestUsersDBOWithoutPassword(String(loginSubstring), Number(limit))
      : await userService.getAllUsersDBOWithoutPassword();
    res.status(HttpStatusCode.OK).send(users);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserDBOWithoutPasswordById(String(id));
    res.status(HttpStatusCode.OK).send(user);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

userRouter.post('/', json(), validator.body(UserSchema), async (req, res, next) => {
  const user: UserCreationAttributes = req.body;
  try {
    const newUser = await userService.createUser(user);
    res.status(HttpStatusCode.CREATED).send(newUser);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

userRouter.patch('/', json(), validator.body(UserSchema), async (req, res, next) => {
  const fieldToUpdate: Partial<User> = req.body;
  const { id } = req.query;
  try {
    const user = await userService.updateUser(String(id), fieldToUpdate);
    res.status(HttpStatusCode.OK).send(user);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

userRouter.delete('/', async (req, res, next) => {
  const { id } = req.query;
  try {
    await userService.deleteUser(String(id));
    res.sendStatus(HttpStatusCode.DELETED);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});
