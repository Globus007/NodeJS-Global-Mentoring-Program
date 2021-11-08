import { Op } from 'sequelize';
import { User } from '../types';
import { UserCreationAttributes, Users } from '../models/user.model';
import { UserNotFoundError } from '../types/errors';

class DbUserService {
  async createUser(user: UserCreationAttributes): Promise<User> {
    return Users.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return Users.findAll({ where: { isDeleted: false } });
  }

  async getUserById(id: string): Promise<User> {
    const user = await Users.findOne({ where: { id, isDeleted: false } });
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await (user as Users).update({ isDeleted: true });
  }

  async updateUser(id: string, fieldsToUpdate: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    return (user as Users).update(fieldsToUpdate);
  }

  async getAutoSuggestUsers(loginSubstring: string, limit?: number): Promise<User[]> {
    return Users.findAll({
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
