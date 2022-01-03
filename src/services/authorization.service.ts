import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { EXPIRE_TIME } from '../constants';
import { userService } from './user.service';
import { encrypt } from '../utils';
import { AuthorizationError } from '../types';

export const login = async (username: string, password: string): Promise<string> => {
  const user = await userService.getUserByLogin(username);
  if (!checkPassword(password, user.password)) {
    throw new AuthorizationError(`Wrong password for user ${username}`);
  }
  return jsonwebtoken.sign({ username }, JWT_SECRET, { expiresIn: EXPIRE_TIME });
};

const checkPassword = (password: string, hashedPassword: string): boolean => encrypt(password) === hashedPassword;
