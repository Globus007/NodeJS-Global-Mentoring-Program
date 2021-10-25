import { memoryUserService } from '../services';
import { Request, Response } from 'express';
import { User, UserService } from '../types';
import { UserSchema } from '../schemas/user.schema';

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers(req: Request, res: Response): void {
    const { loginSubstring, limit } = req.query;
    console.log('getUsers:', { loginSubstring }, { limit });

    const users = loginSubstring
      ? this.userService.getAutoSuggestUsers(String(loginSubstring), Number(limit))
      : this.userService.getAllUsers();

    console.log('getAutoSuggestUsers:', { users });
    res.status(200).send(users);
  }

  getUserById(req: Request, res: Response): Response {
    const { id } = req.params;
    const user = this.userService.getUserById(String(id));

    if (user) {
      console.log('getUserById:', { user });
      return res.status(200).send(user);
    }
    console.log('getUserById:', `user with id ${id} not found`);
    res.sendStatus(404);
  }

  createUser(req: Request, res: Response): Response {
    const user: User = req.body;
    console.log('createUser:', { user });

    const { error } = UserSchema.validate(user);
    if (error) {
      console.error('createUser:', error.message);
      return res.status(400).send(error.message);
    }

    const newUser = this.userService.createUser(user);
    console.log('createUser:', 'user created', { newUser });
    res.status(201).send(newUser);
  }

  deleteUser(req: Request, res: Response): Response {
    const { id } = req.query;
    console.log('deleteUser:', { id });

    if (this.userService.deleteUser(String(id))) {
      console.log('deleteUser:', `user with id ${id} deleted`);
      return res.sendStatus(204);
    }

    console.log('deleteUser:', `user with id ${id} not found`);
    res.sendStatus(404);
  }

  updateUser(req: Request, res: Response): Response {
    const fieldToUpdate: Partial<User> = req.body;
    const { id } = req.query;
    console.log('updateUser:', { id }, { fieldToUpdate });

    const { error } = UserSchema.validate(fieldToUpdate);
    if (error) {
      console.error('updateUser:', error.message);
      return res.status(400).send(error.message);
    }

    const user = this.userService.updateUser(String(id), fieldToUpdate);
    if (user) {
      console.log('updateUser:', `user with id ${id} updated`, { user });
      return res.status(200).send(user);
    }

    console.log('updateUser:', `user with id ${id} not found`);
    res.sendStatus(404);
  }
}

export const userController = new UserController(memoryUserService);
