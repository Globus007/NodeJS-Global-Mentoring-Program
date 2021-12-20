import { v4 as uuidv4 } from 'uuid';
import { Seeder } from '../umzug';
import { encrypt, getCurrentTimestamp } from '../../utils';

const seedUsers = [
  {
    id: uuidv4(),
    login: 'user1',
    password: encrypt('password1'),
    age: 20,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
  {
    id: uuidv4(),
    login: 'user2',
    password: encrypt('password2'),
    age: 25,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
  {
    id: uuidv4(),
    login: 'user3',
    password: encrypt('password3'),
    age: 30,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('users', seedUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('users', { id: seedUsers.map((user) => user.id) });
};
