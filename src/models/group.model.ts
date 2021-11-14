import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { Group, UserPermissions } from '../types';
import { getPermissionValues } from '../utils';

export type GroupCreationAttributes = Optional<Group, 'id'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> implements Group {
  id: string;
  name: string;
  permissions: UserPermissions[];
}

GroupModel.init(
  {
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
      type: DataTypes.TEXT,
    },
    permissions: {
      allowNull: false,
      type: DataTypes.ENUM(...getPermissionValues()),
    },
  },
  { tableName: 'groups', timestamps: false, sequelize: sequelizeConnection, paranoid: false },
);
