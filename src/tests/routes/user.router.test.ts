import request from 'supertest';
import { app } from '../../app';
import { UserModel } from '../../db/models';
import * as auth from '../../middlewares/authorization.middleware';

const mockUsers: UserModel[] = [
  {
    login: 'user01',
    password: 'password01',
    age: 18,
  },
] as never;

jest.spyOn(auth, 'verifyJWT').mockImplementation(() => Promise.resolve(null));

describe('GET /user', () => {
  const serializeMock = jest.spyOn(UserModel, 'findAll').mockResolvedValue(mockUsers);
  test('should return users', async () => {
    const response = await request(app).get('/user').set('x-access-token', 'token');
    expect(response.statusCode).toBe(200);
    expect(serializeMock).toBeCalled();
    expect(response.body).toEqual(mockUsers);
  });
});

describe('POST /user', () => {
  const serializeMock = jest.spyOn(UserModel, 'create').mockResolvedValue(mockUsers[0]);

  test('empty body should fall with validation error', async () => {
    const response = await request(app).post('/user').set('x-access-token', 'token').send(null);
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain('Error validating request body');
    expect(serializeMock).not.toBeCalled();
  });

  test('empty body should fall with validation error', async () => {
    const response = await request(app).post('/user').set('x-access-token', 'token').send(mockUsers[0]);
    expect(response.statusCode).toBe(201);
    expect(serializeMock).toBeCalled();
    expect(response.body).toEqual(mockUsers[0]);
  });
});
