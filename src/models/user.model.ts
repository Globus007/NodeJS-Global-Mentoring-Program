import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config';
import { User } from '../types';
import { encryptUserPassword } from '../utils';

export type UserCreationAttributes = Optional<User, 'id' | 'isDeleted'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    login: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    age: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isDeleted: {
      field: 'deleted',
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, sequelize: sequelizeConnection, paranoid: true, tableName: 'users' },
);

UserModel.beforeCreate(encryptUserPassword);
UserModel.beforeUpdate(encryptUserPassword);
