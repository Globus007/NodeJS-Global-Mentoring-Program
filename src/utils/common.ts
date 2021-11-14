import { UserPermissions } from '../types';

const isNotNumber = (value: string | number): boolean => isNaN(Number(value));

export const getPermissionValues = (): string[] => Object.keys(UserPermissions).filter(isNotNumber);
