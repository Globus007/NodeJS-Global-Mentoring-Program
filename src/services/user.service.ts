import { Op } from 'sequelize';
import { removePassword, UserCreationAttributes, UserModel } from '../db/models';
import { User, UserDBOWithoutPassword, UserNotFoundError } from '../types';
import { FindOptions } from 'sequelize/types/lib/model';
import { trackTime } from '../decorators';

class UserService {
  @trackTime
  async createUser(user: UserCreationAttributes): Promise<User> {
    return UserModel.create(user);
  }

  async getAllUsers(options: FindOptions = {}): Promise<User[]> {
    return UserModel.findAll(options);
  }

  @trackTime
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

  @trackTime
  async getUserDBOWithoutPasswordById(id: string): Promise<UserDBOWithoutPassword> {
    return this.getUserById(id, removePassword);
  }

  @trackTime
  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    return (user as UserModel).destroy();
  }

  @trackTime
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

  @trackTime
  async getAutoSuggestUsersDBOWithoutPassword(
    loginSubstring: string,
    limit?: number,
  ): Promise<UserDBOWithoutPassword[]> {
    return this.getAutoSuggestUsers(loginSubstring, limit, removePassword);
  }
}

export const userService = new UserService();
