import { DataTypes, Model, ModelAttributes } from 'sequelize';
import { UserModel } from './user.model';
import { GroupModel } from './group.model';
import { sequelize } from '../db.config';

type UserGroup = {
  userId: string;
  groupId: string;
};

export class UserGroupModel extends Model<UserGroup> implements UserGroup {
  groupId: string;
  userId: string;
}

export const userGroupAttributes: ModelAttributes = {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: UserModel,
      key: 'id',
    },
  },
  groupId: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: GroupModel,
      key: 'id',
    },
  },
};

UserGroupModel.init(userGroupAttributes, { tableName: 'user_group', sequelize, timestamps: true });

UserModel.belongsToMany(GroupModel, {
  foreignKey: 'userId',
  through: UserGroupModel,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  timestamps: true,
});

GroupModel.belongsToMany(UserModel, {
  foreignKey: 'groupId',
  through: UserGroupModel,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  timestamps: true,
});
