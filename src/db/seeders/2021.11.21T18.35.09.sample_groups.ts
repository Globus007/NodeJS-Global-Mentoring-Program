import { Seeder } from '../umzug';

const seedGroups = [
  {
    id: '7c104e6a-a8b5-4689-8b28-707772c1f6fe',
    name: 'user',
    permissions: ['READ', 'SHARE', 'UPLOAD_FILES'],
    createdAt: '2021-11-20T17:25:19.081Z',
    updatedAt: '2021-11-20T17:25:19.081Z',
  },
  {
    id: '24e8c160-bfd6-42a5-8498-385e28e81926',
    name: 'admin',
    permissions: ['WRITE', 'READ', 'DELETE'],
    createdAt: '2021-11-20T17:25:19.081Z',
    updatedAt: '2021-11-20T17:25:19.081Z',
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  for (const group of seedGroups) {
    await sequelize.getQueryInterface().insert(null, 'groups', group);
  }
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('groups', { id: seedGroups.map((group) => group.id) });
};
