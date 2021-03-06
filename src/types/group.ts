export enum UserPermissions {
  'READ',
  'WRITE',
  'DELETE',
  'SHARE',
  'UPLOAD_FILES',
}

export type Group = {
  id: string;
  name: string;
  permissions: UserPermissions[];
};
