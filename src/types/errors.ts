import { HttpStatusCode } from './common';

export class CustomError extends Error {
  statusCode: number;

  constructor(message = 'Unknown error occurred', statusCode = HttpStatusCode.INTERNAL_SERVER) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CustomError';
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class UserNotFoundError extends CustomError {
  constructor(message = 'User not found') {
    super(message, HttpStatusCode.NOT_FOUND);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class GroupNotFoundError extends CustomError {
  constructor(id: string) {
    super(`Group with id ${id} not found`, HttpStatusCode.NOT_FOUND);
    this.name = 'GroupNotFoundError';
    Object.setPrototypeOf(this, GroupNotFoundError.prototype);
  }
}

export class AuthorizationError extends CustomError {
  constructor(message = 'Unauthorized', statusCode = HttpStatusCode.UNAUTHORIZED) {
    super(message, statusCode);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
