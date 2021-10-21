import { memoryUserService, UserService } from '../services';
import { Request, Response } from 'express';
import { User } from '../types';
import { UserSchema } from '../schemas/user.schema';

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    const { id, loginSubstring, limit } = req.query;
    console.log('getUsers:', { id }, { loginSubstring }, { limit });

    if (id !== undefined) {
      const user = this.userService.getUserById(String(id));

      if (user) {
        console.log('getUserById:', { user });
        return res.status(200).send(user);
      }
      console.log('getUserById:', `user with id ${id} not found`);
      return res.sendStatus(404);
    }

    if (loginSubstring !== undefined) {
      const users =
        limit !== undefined
          ? this.userService.getAutoSuggestUsers(String(loginSubstring), Number(limit))
          : this.userService.getAutoSuggestUsers(String(loginSubstring));
      console.log('getAutoSuggestUsers:', { users });
      return res.status(200).send(users);
    }

    const users = this.userService.getAllUsers();
    console.log('getAllUsers:', { users });
    res.status(200).send(users);
  }

  async createUser(req: Request, res: Response): Promise<Response> {
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

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    console.log('deleteUser:', { id });

    if (this.userService.deleteUser(String(id))) {
      console.log('deleteUser:', `user with id ${id} deleted`);
      return res.sendStatus(204);
    }

    console.log('deleteUser:', `user with id ${id} not found`);
    res.sendStatus(404);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
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
