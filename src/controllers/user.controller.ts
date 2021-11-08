import { Request, Response } from 'express';
import { User } from '../types';
import { dbUserService } from '../services/db.user.service';
import { UserCreationAttributes } from '../models/user.model';
import { UserNotFoundError } from '../types/errors';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    const { loginSubstring, limit } = req.query;
    try {
      const users = loginSubstring
        ? await dbUserService.getAutoSuggestUsers(String(loginSubstring), Number(limit))
        : await dbUserService.getAllUsers();
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await dbUserService.getUserById(String(id));
      res.status(200).send(user);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return res.status(404).send(e.message);
      }
      res.status(500).send(e.message);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user: UserCreationAttributes = req.body;
    try {
      const newUser = await dbUserService.createUser(user);
      res.status(201).send(newUser);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    try {
      await dbUserService.deleteUser(String(id));
      res.sendStatus(204);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return res.status(404).send(e.message);
      }
      res.status(500).send(e.message);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const fieldToUpdate: Partial<User> = req.body;
    const { id } = req.query;
    try {
      const user = await dbUserService.updateUser(String(id), fieldToUpdate);
      res.status(200).send(user);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return res.status(404).send(e.message);
      }
      res.status(500).send(e);
    }
  }
}

export const userController = new UserController();
