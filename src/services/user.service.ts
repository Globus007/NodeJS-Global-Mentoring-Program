import { Op } from 'sequelize';
import { removePassword, UserCreationAttributes, UserModel } from '../db/models';
import { User, UserDBOWithoutPassword, UserNotFoundError } from '../types';
import { FindOptions } from 'sequelize/types/lib/model';

class UserService {
  async createUser(user: UserCreationAttributes): Promise<User> {
    return UserModel.create(user);
  }

  async getAllUsers(options: FindOptions = {}): Promise<User[]> {
    return UserModel.findAll(options);
  }

  async getAllUsersDBOWithoutPassword(): Promise<UserDBOWithoutPassword[]> {
    return this.getAllUsers(removePassword);
  }

  async getUserById(id: string, options: FindOptions = {}): Promise<User> {
    const user = await UserModel.findByPk(id, options);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  async getUserDBOWithoutPasswordById(id: string): Promise<UserDBOWithoutPassword> {
    return this.getUserById(id, removePassword);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    return (user as UserModel).destroy();
  }

  async updateUser(id: string, fieldsToUpdate: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    return (user as UserModel).update(fieldsToUpdate);
  }

  async getAutoSuggestUsers(loginSubstring: string, limit?: number, options: FindOptions = {}): Promise<User[]> {
    const findOptions: FindOptions = {
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`,
        },
      },
      order: [['login', 'ASC']],
      limit: limit ? limit : null,
    };
    return UserModel.findAll({ ...findOptions, ...options });
  }

  async getAutoSuggestUsersDBOWithoutPassword(
    loginSubstring: string,
    limit?: number,
  ): Promise<UserDBOWithoutPassword[]> {
    return this.getAutoSuggestUsers(loginSubstring, limit, removePassword);
  }
}

export const userService = new UserService();
