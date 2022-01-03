import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { addUsersToGroup } from '../services';
import { UserGroupSchema } from '../schemas';
import { HttpStatusCode } from '../types';
import { logRouterError } from '../utils';

export const userGroupRouter = Router();
const validator = createValidator({});

userGroupRouter.post('/', json(), validator.body(UserGroupSchema), async (req, res, next) => {
  try {
    const { groupId, userIds } = req.body;
    await addUsersToGroup(groupId, userIds);
    res.sendStatus(HttpStatusCode.CREATED);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});
