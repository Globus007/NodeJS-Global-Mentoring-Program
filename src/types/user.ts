export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export interface UserService {
  getAllUsers(): User[];

  getUserById(id: string): User;

  getAutoSuggestUsers(loginSubstring: string, limit?: number): User[];

  createUser(user: User): User;

  deleteUser(id: string): boolean;

  updateUser(id: string, fieldsToUpdate: Partial<User>): User;
}
