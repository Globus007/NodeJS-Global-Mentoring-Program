import { json, Router } from 'express';
import { userController } from '../controllers/user.controller';

export const userRouter = Router();

userRouter
  .get('/', userController.getUsers.bind(userController))
  .get('/:id', userController.getUserById.bind(userController))
  .post('/', json(), userController.createUser.bind(userController))
  .patch('/', json(), userController.updateUser.bind(userController))
  .delete('/', userController.deleteUser.bind(userController));
