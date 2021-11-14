import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserSchema } from '../schemas';
import { dbUserService } from '../services/db.user.service';
import { User, UserNotFoundError } from '../types';
import { UserCreationAttributes } from '../models';

export const userRouter = Router();
const validator = createValidator({});

userRouter.get('/', async (req, res) => {
  const { loginSubstring, limit } = req.query;
  try {
    const users = loginSubstring
      ? await dbUserService.getAutoSuggestUsers(String(loginSubstring), Number(limit))
      : await dbUserService.getAllUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await dbUserService.getUserById(String(id));
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
    const newUser = await dbUserService.createUser(user);
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

userRouter.patch('/', json(), validator.body(UserSchema), async (req, res) => {
  const fieldToUpdate: Partial<User> = req.body;
  const { id } = req.query;
  try {
    const user = await dbUserService.updateUser(String(id), fieldToUpdate);
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
    await dbUserService.deleteUser(String(id));
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e.message);
  }
});
