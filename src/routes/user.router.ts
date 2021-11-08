import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { userController } from '../controllers/user.controller';
import { UserSchema } from '../schemas/user.schema';

export const userRouter = Router();
const validator = createValidator({});

userRouter
  .get('/', userController.getUsers)
  .get('/:id', userController.getUserById)
  .post('/', json(), validator.body(UserSchema), userController.createUser)
  .patch('/', json(), validator.body(UserSchema), userController.updateUser)
  .delete('/', userController.deleteUser);
