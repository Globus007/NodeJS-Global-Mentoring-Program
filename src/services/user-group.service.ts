import { sequelize } from '../db/db.config';
import { UserGroupModel } from '../db/models';

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<void> => {
  try {
    await sequelize.transaction(async (transaction) => {
      for (const userId of userIds) {
        await UserGroupModel.create({ userId, groupId }, { transaction });
      }
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
