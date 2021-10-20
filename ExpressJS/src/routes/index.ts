import { json, Router } from 'express';
import { userController } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', json(), userController.getAllUsers.bind(userController));
userRouter.get('/:id', json(), userController.getUserById.bind(userController));
userRouter.post('/', json(), userController.createUser.bind(userController));
userRouter.patch('/', json(), userController.updateUser.bind(userController));
userRouter.delete('/', json(), userController.deleteUser.bind(userController));
