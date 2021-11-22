interface UserService {
  getAllUsers(): User[];

  getUserById(id: string): User;

  getAutoSuggestUsers(loginSubstring: string, limit?: number): User[];

  createUser(user: User): User;

  deleteUser(id: string): boolean;

  updateUser(id: string, fieldsToUpdate: Partial<User>): User;
}

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

class MemoryUserService implements UserService {
  private readonly users: User[] = [];

  getAllUsers(): User[] {
    return this.users.filter((user) => !user.isDeleted);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id && !user.isDeleted);
  }

  getAutoSuggestUsers(loginSubstring: string, limit?: number): User[] {
    const filteredUsers = this.getAllUsers()
      .sort((a, b) => a.login.localeCompare(b.login))
      .filter((user) => user.login.includes(loginSubstring));

    return limit ? filteredUsers.slice(0, limit) : filteredUsers;
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
