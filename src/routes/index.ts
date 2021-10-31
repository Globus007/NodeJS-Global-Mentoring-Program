import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { userController } from '../controllers/user.controller';
import { UserSchema } from '../schemas/user.schema';

export const userRouter = Router();
const validator = createValidator({});

userRouter
  .get('/', userController.getUsers.bind(userController))
  .get('/:id', userController.getUserById.bind(userController))
  .post('/', json(), validator.body(UserSchema), userController.createUser.bind(userController))
  .patch('/', json(), validator.body(UserSchema), userController.updateUser.bind(userController))
  .delete('/', userController.deleteUser.bind(userController));
