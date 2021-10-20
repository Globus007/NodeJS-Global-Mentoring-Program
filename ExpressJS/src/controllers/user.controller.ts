import { memoryUserService, UserService } from '../services';
import { Request, Response } from 'express';
import { User } from '../types';

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = this.userService.getAllUsers();
    res.status(200).send(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = this.userService.getUserById(id);
    if (user) {
      res.status(200).send(user);
    }
    res.sendStatus(404);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    // TODO validate user
    const newUser = this.userService.createUser(user);
    res.status(201).send(newUser);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (this.userService.deleteUser(id)) {
      res.sendStatus(204);
    }
    res.sendStatus(404);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const fieldToUpdate: Partial<User> = req.body;
    const { id } = req.params;
    const user = this.userService.updateUser(id, fieldToUpdate);
    if (user) {
      res.status(200).send(user);
    }
    res.sendStatus(404);
  }
}

export const userController = new UserController(memoryUserService);
