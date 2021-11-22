import { Seeder } from '../umzug';

const seedUsers = [
  {
    id: 'b7344e6b-162c-48fa-aeb7-0af480a2be2d',
    login: 'user1',
    password: '324fb86faaaa316f155c8ab9484f59ba1554862eb7fe54cf748e891a41ebafdd',
    age: 20,
    createdAt: '2021-11-20T17:25:19.081Z',
    updatedAt: '2021-11-20T17:25:19.081Z',
  },
  {
    id: 'cce36df5-5d64-4492-b238-658c6e5897ce',
    login: 'user2',
    password: '4828aff6d2ece9f2bbeaee3928ad907708d17372a4429ece817c73feddfe2093',
    age: 25,
    createdAt: '2021-11-20T17:25:19.081Z',
    updatedAt: '2021-11-20T17:25:19.081Z',
  },
  {
    id: '1119a8e7-d846-406e-b726-f70e147e3a2d',
    login: 'user3',
    password: 'ad0f424b2909b5ed0bb5da9a6358e15cfd2cae10ab0625b82d1ee06d940ca1e9',
    age: 30,
    createdAt: '2021-11-20T17:25:19.081Z',
    updatedAt: '2021-11-20T17:25:19.081Z',
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('users', seedUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('users', { id: seedUsers.map((user) => user.id) });
};
