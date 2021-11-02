import { memoryUserService } from '../services';
import { Request, Response } from 'express';
import { User, UserService } from '../types';

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const { loginSubstring, limit } = req.query;

    const users = loginSubstring
      ? await this.userService.getAutoSuggestUsers(String(loginSubstring), Number(limit))
      : await this.userService.getAllUsers();

    res.status(200).send(users);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await this.userService.getUserById(String(id));

    if (user) {
      return res.status(200).send(user);
    }
    res.sendStatus(404);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const newUser = await this.userService.createUser(user);
    res.status(201).send(newUser);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    const isDeleted = await this.userService.deleteUser(String(id));

    if (isDeleted) {
      return res.sendStatus(204);
    }
    res.sendStatus(404);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const fieldToUpdate: Partial<User> = req.body;
    const { id } = req.query;
    const user = await this.userService.updateUser(String(id), fieldToUpdate);

    if (user) {
      return res.status(200).send(user);
    }
    res.sendStatus(404);
  }
}

export const userController = new UserController(memoryUserService);
