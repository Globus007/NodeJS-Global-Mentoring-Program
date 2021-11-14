import { Op } from 'sequelize';
import { UserCreationAttributes, UserModel } from '../models';
import { User, UserNotFoundError } from '../types';

class DbUserService {
  async createUser(user: UserCreationAttributes): Promise<User> {
    return UserModel.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return UserModel.findAll({ where: { isDeleted: false } });
  }

  async getUserById(id: string): Promise<User> {
    const user = await UserModel.findOne({ where: { id, isDeleted: false } });
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await (user as UserModel).update({ isDeleted: true });
  }

  async updateUser(id: string, fieldsToUpdate: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    return (user as UserModel).update(fieldsToUpdate);
  }

  async getAutoSuggestUsers(loginSubstring: string, limit?: number): Promise<User[]> {
    return UserModel.findAll({
      where: {
        isDeleted: false,
        login: {
          [Op.like]: `%${loginSubstring}%`,
        },
      },
      order: [['login', 'ASC']],
      limit: limit ? limit : null,
    });
  }
}

export const dbUserService = new DbUserService();
