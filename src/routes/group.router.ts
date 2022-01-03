import { json, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { groupService } from '../services';
import { Group, HttpStatusCode } from '../types';
import { GroupCreationAttributes } from '../db/models';

import { GroupSchema } from '../schemas';
import { logRouterError } from '../utils';

export const groupRouter = Router();
const validator = createValidator({});

groupRouter.get('/', async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(HttpStatusCode.OK).send(groups);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

groupRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const groups = await groupService.getGroupById(id);
    res.status(HttpStatusCode.OK).send(groups);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

groupRouter.post('/', json(), validator.body(GroupSchema), async (req, res, next) => {
  const group: GroupCreationAttributes = req.body;
  try {
    const newGroup = await groupService.createGroup(group);
    res.status(HttpStatusCode.CREATED).send(newGroup);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

groupRouter.patch('/', json(), validator.body(GroupSchema), async (req, res, next) => {
  const fieldsToUpdate: Partial<Group> = req.body;
  const { id } = req.query;
  try {
    const group = await groupService.updateGroup(String(id), fieldsToUpdate);
    res.status(HttpStatusCode.OK).send(group);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});

groupRouter.delete('/', async (req, res, next) => {
  const { id } = req.query;
  try {
    await groupService.deleteGroup(String(id));
    res.sendStatus(HttpStatusCode.DELETED);
  } catch (e) {
    logRouterError(e, req);
    return next(e);
  }
});
