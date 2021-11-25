import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { addUsersToGroup } from '../services';
import { UserGroupSchema } from '../schemas';

export const userGroupRouter = Router();
const validator = createValidator({});

userGroupRouter.post('/', json(), validator.body(UserGroupSchema), async (req, res) => {
  try {
    const { groupId, userIds } = req.body;
    await addUsersToGroup(groupId, userIds);
    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
