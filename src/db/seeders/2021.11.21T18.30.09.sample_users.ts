import { v4 as uuidv4 } from 'uuid';
import { Seeder } from '../umzug';
import { getCurrentTimestamp } from '../../utils';

const seedUsers = [
  {
    id: uuidv4(),
    login: 'user1',
    password: '324fb86faaaa316f155c8ab9484f59ba1554862eb7fe54cf748e891a41ebafdd',
    age: 20,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
  {
    id: uuidv4(),
    login: 'user2',
    password: '4828aff6d2ece9f2bbeaee3928ad907708d17372a4429ece817c73feddfe2093',
    age: 25,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
  {
    id: uuidv4(),
    login: 'user3',
    password: 'ad0f424b2909b5ed0bb5da9a6358e15cfd2cae10ab0625b82d1ee06d940ca1e9',
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
