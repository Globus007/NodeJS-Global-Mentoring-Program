import { Migration } from '../umzug';
import { groupAttributes } from '../models';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('groups', groupAttributes);
  await sequelize.getQueryInterface().addColumn('groups', 'createdAt', { type: 'TIMESTAMP', allowNull: false });
  await sequelize.getQueryInterface().addColumn('groups', 'updatedAt', { type: 'TIMESTAMP', allowNull: false });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('groups');
};
