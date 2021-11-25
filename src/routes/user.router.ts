import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserSchema } from '../schemas';
import { userService } from '../services';
import { User, UserNotFoundError } from '../types';
import { UserCreationAttributes } from '../db/models';

export const userRouter = Router();
const validator = createValidator({});

userRouter.get('/', async (req, res) => {
  const { loginSubstring, limit } = req.query;
  try {
    const users = loginSubstring
      ? await userService.getAutoSuggestUsersDBOWithoutPassword(String(loginSubstring), Number(limit))
      : await userService.getAllUsersDBOWithoutPassword();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserDBOWithoutPasswordById(String(id));
    res.status(200).send(user);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e.message);
  }
});

userRouter.post('/', json(), validator.body(UserSchema), async (req, res) => {
  const user: UserCreationAttributes = req.body;
  try {
    const newUser = await userService.createUser(user);
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.patch('/', json(), validator.body(UserSchema), async (req, res) => {
  const fieldToUpdate: Partial<User> = req.body;
  const { id } = req.query;
  try {
    const user = await userService.updateUser(String(id), fieldToUpdate);
    res.status(200).send(user);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e);
  }
});

userRouter.delete('/', async (req, res) => {
  const { id } = req.query;
  try {
    await userService.deleteUser(String(id));
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e.message);
  }
});
