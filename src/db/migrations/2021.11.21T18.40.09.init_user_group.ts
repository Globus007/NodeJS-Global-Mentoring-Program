import { Migration } from '../umzug';
import { userGroupAttributes } from '../models';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('user_group', userGroupAttributes);
  await sequelize.getQueryInterface().addColumn('user_group', 'createdAt', { type: 'TIMESTAMP', allowNull: false });
  await sequelize.getQueryInterface().addColumn('user_group', 'updatedAt', { type: 'TIMESTAMP', allowNull: false });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('user_group');
};
