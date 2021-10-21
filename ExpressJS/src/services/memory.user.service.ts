import { User } from '../types';
import { UserService } from './user.service';

class MemoryUserService implements UserService {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  getAllUsers(): User[] {
    return this.users.filter((user) => !user.isDeleted);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id && !user.isDeleted);
  }

  getAutoSuggestUsers(loginSubstring: string, limit?: number): User[] {
    const filteredUsers = this.users
      .filter((user) => !user.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login))
      .filter((user) => user.login.includes(loginSubstring));

    return limit !== undefined ? filteredUsers.slice(0, limit) : filteredUsers;
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  deleteUser(id: string): boolean {
    const user = this.getUserById(id);
    if (user) {
      this.getUserById(id).isDeleted = true;
      return true;
    }
    return false;
  }

  updateUser(id: string, fieldsToUpdate: Partial<User>): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index < 0) {
      return null;
    }
    this.users[index] = { ...this.users[index], ...fieldsToUpdate };
    return this.users[index];
  }
}

export const memoryUserService = new MemoryUserService();
