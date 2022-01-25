import { userService } from '../../services';
import { UserCreationAttributes } from '../../db/models';
import { User } from '../../types';
import { encrypt } from '../../utils';

const testUser: UserCreationAttributes = {
  login: 'testUser',
  password: 'testPass',
  age: 20,
};

const INITIAL_USERS_LENGTH = 3;
const INCORRECT_ID = 'wrongId';
const INCORRECT_LOGIN = 'wrongLogin';

describe('getAllUsers', () => {
  test('should return all 3 Users with password', async () => {
    const users = await userService.getAllUsers();
    expect(users.length).toBe(INITIAL_USERS_LENGTH);
    expect(users[0].password).not.toBeUndefined();
  });

  test('should return all 3 UsersDBOWithoutPassword', async () => {
    const users = await userService.getAllUsersDBOWithoutPassword();
    expect(users.length).toBe(INITIAL_USERS_LENGTH);
  });
});

describe('getAutoSuggestUsers', () => {
  test('should return 1 user with login substring "user1"', async () => {
    const users = await userService.getAutoSuggestUsers('user1');
    expect(users.length).toBe(1);
  });

  test('should return 3 users with login substring "user"', async () => {
    const users = await userService.getAutoSuggestUsers('user');
    expect(users.length).toBe(3);
  });

  test('should return 2 users with login substring "user" and limit 2', async () => {
    const users = await userService.getAutoSuggestUsers('user', 2);
    expect(users.length).toBe(2);
  });

  test('should return 3 UsersDBOWithoutPassword with login substring "user"', async () => {
    const users = await userService.getAutoSuggestUsersDBOWithoutPassword('user');
    expect(users.length).toBe(3);
  });
});

describe('createUser, deleteUser, getUserById', () => {
  let addedUser: User;

  describe('createUser', () => {
    test('should create user', async () => {
      addedUser = await userService.createUser(testUser);
      const users = await userService.getAllUsers();

      expect(addedUser.login).toBe(testUser.login);
      expect(addedUser.password).toBe(encrypt(testUser.password));
      expect(users.length).toBe(INITIAL_USERS_LENGTH + 1);
    });
  });

  describe('getUserById', () => {
    test('should return user by id', async () => {
      const receivedUser = await userService.getUserById(addedUser.id);

      expect(receivedUser.login).toBe(addedUser.login);
      expect(receivedUser.password).toBe(addedUser.password);
      expect(receivedUser.id).toBe(addedUser.id);
      expect(receivedUser.age).toBe(addedUser.age);
    });

    test('should trow error when id incorrect', async () => {
      await expect(() => userService.getUserById(INCORRECT_ID)).rejects.toThrow();
    });

    test('should return UserDBOWithoutPassword by id', async () => {
      const receivedUser = await userService.getUserDBOWithoutPasswordById(addedUser.id);

      expect(receivedUser.login).toEqual(addedUser.login);
      expect(receivedUser.age).toEqual(addedUser.age);
      expect(receivedUser.id).toEqual(addedUser.id);
    });
  });

  describe('getUserByLogin', () => {
    test('should return user by login', async () => {
      const receivedUser = await userService.getUserByLogin('user1');
      expect(receivedUser.login).toBe('user1');
    });

    test('should trow error when login incorrect', async () => {
      await expect(() => userService.getUserByLogin(INCORRECT_LOGIN)).rejects.toThrow();
    });
  });

  describe('updateUser', () => {
    test('should update user by new login', async () => {
      const newLogin = { login: 'new login' };
      await userService.updateUser(addedUser.id, newLogin);
      const receivedUser = await userService.getUserById(addedUser.id);
      expect(receivedUser.login).toEqual(newLogin.login);
    });
  });

  describe('deleteUser', () => {
    test('should delete user', async () => {
      await userService.deleteUser(addedUser.id);
      const users = await userService.getAllUsers();
      expect(users.length).toBe(INITIAL_USERS_LENGTH);
    });
  });
});
