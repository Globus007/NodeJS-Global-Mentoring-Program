import { Migration } from '../umzug';
import { userAttributes } from '../models';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('users', userAttributes);
  await sequelize.getQueryInterface().addColumn('users', 'createdAt', { type: 'TIMESTAMP', allowNull: false });
  await sequelize.getQueryInterface().addColumn('users', 'updatedAt', { type: 'TIMESTAMP', allowNull: false });
  await sequelize.getQueryInterface().addColumn('users', 'deletedAt', { type: 'TIMESTAMP' });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('users');
};
