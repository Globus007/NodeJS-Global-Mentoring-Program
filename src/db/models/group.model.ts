import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { Group, UserPermissions } from '../../types';
import { getPermissionValues } from '../../utils';
import { sequelize } from '../db.config';

export type GroupCreationAttributes = Optional<Group, 'id'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> implements Group {
  id: string;
  name: string;
  permissions: UserPermissions[];
}

export const groupAttributes: ModelAttributes = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  permissions: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.ENUM(...getPermissionValues())),
  },
};

GroupModel.init(groupAttributes, { tableName: 'groups', sequelize, timestamps: true });
