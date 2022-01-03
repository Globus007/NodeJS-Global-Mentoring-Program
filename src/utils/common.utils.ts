import { Error } from 'sequelize';
import { Request } from 'express';
import { UserPermissions } from '../types';
import { Logger } from '../components';

const isNotNumber = (value: string | number): boolean => isNaN(Number(value));

export const getPermissionValues = (): string[] => Object.keys(UserPermissions).filter(isNotNumber);

export const logRouterError = (e: Error, req: Request): void => {
  const { method, path, query, body } = req;
  Logger.error(e.message, { method, path, query, body });
};
