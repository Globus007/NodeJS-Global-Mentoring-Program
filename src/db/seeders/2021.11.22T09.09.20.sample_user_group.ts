import { Seeder } from '../umzug';

const seedUserGroup = {
  userId: 'b7344e6b-162c-48fa-aeb7-0af480a2be2d',
  groupId: '7c104e6a-a8b5-4689-8b28-707772c1f6fe',
  createdAt: '2021-11-20T17:25:19.081Z',
  updatedAt: '2021-11-20T17:25:19.081Z',
};
export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('user_group', [seedUserGroup]);
};

export const down: Seeder = async ({ context: sequelize }) => {
  const { userId, groupId } = seedUserGroup;
  await sequelize.getQueryInterface().bulkDelete('user_group', { userId, groupId });
};
