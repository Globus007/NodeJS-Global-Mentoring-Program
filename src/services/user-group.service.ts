import { sequelize } from '../db/db.config';
import { UserGroupModel } from '../db/models';

export const addUsersToGroup = (groupId: string, userIds: string[]): Promise<void> =>
  sequelize.transaction(async (transaction) => {
    for (const userId of userIds) {
      await UserGroupModel.create({ userId, groupId }, { transaction });
    }
  });
