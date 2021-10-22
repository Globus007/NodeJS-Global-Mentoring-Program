import { json, Router } from 'express';
import { userController } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', userController.getUsers.bind(userController));
userRouter.post('/', json(), userController.createUser.bind(userController));
userRouter.patch('/', json(), userController.updateUser.bind(userController));
userRouter.delete('/', userController.deleteUser.bind(userController));
