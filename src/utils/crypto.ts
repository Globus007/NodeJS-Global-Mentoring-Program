import crypto from 'crypto';
import { SECRET_KEY } from '../config';
import { UserModel } from '../db/models';

export const encrypt = (text: string): string => {
  return crypto.createHmac('sha256', SECRET_KEY).update(text).digest('hex');
};

export const encryptUserPassword = (user: UserModel): void => {
  user.password = encrypt(user.password);
};
