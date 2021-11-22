import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { User } from '../../types';
import { encryptUserPassword } from '../../utils';
import { sequelize } from '../db.config';
import { FindOptions } from 'sequelize/types/lib/model';

export type UserCreationAttributes = Optional<User, 'id'>;

export const removePassword: FindOptions = { attributes: { exclude: ['password'] } };

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  id: string;
  login: string;
  password: string;
  age: number;
}

export const userAttributes: ModelAttributes = {
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
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.CHAR(64),
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

UserModel.init(userAttributes, { tableName: 'users', sequelize, timestamps: true, paranoid: true });

UserModel.beforeCreate(encryptUserPassword);
UserModel.beforeUpdate(encryptUserPassword);
