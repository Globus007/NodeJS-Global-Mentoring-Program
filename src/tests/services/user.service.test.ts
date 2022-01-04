import { userService } from '../../services';
import { UserCreationAttributes } from '../../db/models';
import { User } from '../../types';
import { encrypt } from '../../utils';

const testUser: UserCreationAttributes = {
  login: 'testUser',
  password: 'testPass',
  age: 20,
};

describe('getAllUsers', () => {
  test('getAllUsers should work correct', async () => {
    const users = await userService.getAllUsers();
    expect(users.length).toBe(3);
    expect(users[0].password).not.toBeUndefined();
  });

  test('getAllUsersDBOWithoutPassword should work correct', async () => {
    const users = await userService.getAllUsersDBOWithoutPassword();
    expect(users.length).toBe(3);
  });
});

describe('getAutoSuggestUsers', () => {
  test('getAutoSuggestUsers should return 1 users with login substring "user1"', async () => {
    const users = await userService.getAutoSuggestUsers('user1');
    expect(users.length).toBe(1);
  });

  test('getAutoSuggestUsers should return 3 users with login substring "user"', async () => {
    const users = await userService.getAutoSuggestUsers('user');
    expect(users.length).toBe(3);
  });

  test('getAutoSuggestUsers should return 2 users with login substring "user" and limit 2', async () => {
    const users = await userService.getAutoSuggestUsers('user', 2);
    expect(users.length).toBe(2);
  });

  test('getAutoSuggestUsersDBOWithoutPassword should return 3 users with login substring "user"', async () => {
    const users = await userService.getAutoSuggestUsersDBOWithoutPassword('user');
    expect(users.length).toBe(3);
  });
});

describe('createUser, deleteUser, getUserById', () => {
  let addedUser: User;

  test('createUser should work correct', async () => {
    addedUser = await userService.createUser(testUser);
    const users = await userService.getAllUsers();

    expect(addedUser.login).toBe(testUser.login);
    expect(addedUser.password).toBe(encrypt(testUser.password));
    expect(users.length).toBe(4);
  });

  test('getUserById should work correct', async () => {
    const receivedUser = await userService.getUserById(addedUser.id);

    expect(receivedUser.login).toBe(addedUser.login);
    expect(receivedUser.password).toBe(addedUser.password);
    expect(receivedUser.id).toBe(addedUser.id);
    expect(receivedUser.age).toBe(addedUser.age);
  });

  test('getUserDBOWithoutPasswordById should work correct', async () => {
    const receivedUser = await userService.getUserDBOWithoutPasswordById(addedUser.id);

    expect(receivedUser.login).toEqual(addedUser.login);
    expect(receivedUser.age).toEqual(addedUser.age);
    expect(receivedUser.id).toEqual(addedUser.id);
  });

  test('getUserById should trow error when id incorrect', async () => {
    await expect(() => userService.getUserById('wrongId')).rejects.toThrow();
  });

  test('getUserByLogin should work correct', async () => {
    const receivedUser = await userService.getUserByLogin('user1');
    expect(receivedUser.login).toBe('user1');
  });

  test('getUserByLogin should trow error when login incorrect', async () => {
    await expect(() => userService.getUserByLogin('wrongLogin')).rejects.toThrow();
  });

  test('updateUser should work correct', async () => {
    const newLogin = { login: 'new login' };
    await userService.updateUser(addedUser.id, newLogin);
    const receivedUser = await userService.getUserById(addedUser.id);
    expect(receivedUser.login).toEqual(newLogin.login);
  });

  test('deleteUser should work correct', async () => {
    await userService.deleteUser(addedUser.id);

    const users = await userService.getAllUsers();
    expect(users.length).toBe(3);
  });
});
