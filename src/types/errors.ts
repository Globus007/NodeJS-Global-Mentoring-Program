export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User with id ${id} not found`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class GroupNotFoundError extends Error {
  constructor(id: string) {
    super(`Group with id ${id} not found`);
    this.name = 'GroupNotFoundError';
    Object.setPrototypeOf(this, GroupNotFoundError.prototype);
  }
}
