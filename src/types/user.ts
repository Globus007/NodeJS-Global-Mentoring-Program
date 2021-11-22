export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
};

export type UserDBOWithoutPassword = Omit<User, 'password'>;
