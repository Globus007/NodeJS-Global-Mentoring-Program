import { DataTypes, Model, Optional } from 'sequelize';
import { User } from '../types';
import { sequelizeConnection } from '../config';

export type UserCreationAttributes = Optional<User, 'id' | 'isDeleted'>;

export class Users extends Model<User, UserCreationAttributes> implements User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

Users.init(
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
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false, sequelize: sequelizeConnection, paranoid: true },
);
