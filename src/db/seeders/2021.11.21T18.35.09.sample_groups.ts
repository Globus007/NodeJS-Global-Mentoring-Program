import { v4 as uuidv4 } from 'uuid';
import { Seeder } from '../umzug';
import { getCurrentTimestamp } from '../../utils';

const seedGroups = [
  {
    id: uuidv4(),
    name: 'user',
    permissions: ['READ', 'SHARE', 'UPLOAD_FILES'],
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  },
  {
    id: uuidv4(),
    name: 'admin',
    permissions: ['WRITE', 'READ', 'DELETE'],
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
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
