import { User } from '../types';
import { UserService } from './user.service';

class MemoryUserService implements UserService {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  getAllUsers(): User[] {
    console.log(this.users);
    return this.users.filter((user) => !user.isDeleted);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id && !user.isDeleted);
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
    return this.users
      .filter((user) => !user.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login))
      .filter((user) => user.login.includes(loginSubstring))
      .slice(0, limit);
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  deleteUser(id: string): boolean {
    const user = this.getUserById(id);
    if (user !== null) {
      this.getUserById(id).isDeleted = true;
      return true;
    }
    return false;
  }

  updateUser(id: string, fieldsToUpdate: Partial<User>): User {
    let user = this.getUserById(id);
    if (user !== null) {
      user = { ...user, ...fieldsToUpdate };
      return user;
    }
    return null;
  }
}

export const memoryUserService = new MemoryUserService();
