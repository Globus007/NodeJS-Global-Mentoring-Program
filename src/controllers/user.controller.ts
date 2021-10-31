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

    const users = loginSubstring
      ? this.userService.getAutoSuggestUsers(String(loginSubstring), Number(limit))
      : this.userService.getAllUsers();

    res.status(200).send(users);
  }

  getUserById(req: Request, res: Response): Response {
    const { id } = req.params;
    const user = this.userService.getUserById(String(id));

    if (user) {
      return res.status(200).send(user);
    }
    res.sendStatus(404);
  }

  createUser(req: Request, res: Response): Response {
    const user: User = req.body;

    const { error } = UserSchema.validate(user);
    if (error) {
      return res.status(400).send(error.message);
    }

    const newUser = this.userService.createUser(user);
    res.status(201).send(newUser);
  }

  deleteUser(req: Request, res: Response): Response {
    const { id } = req.query;

    if (this.userService.deleteUser(String(id))) {
      return res.sendStatus(204);
    }

    res.sendStatus(404);
  }

  updateUser(req: Request, res: Response): Response {
    const fieldToUpdate: Partial<User> = req.body;
    const { id } = req.query;

    const { error } = UserSchema.validate(fieldToUpdate);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user = this.userService.updateUser(String(id), fieldToUpdate);
    if (user) {
      return res.status(200).send(user);
    }

    res.sendStatus(404);
  }
}

export const userController = new UserController(memoryUserService);
