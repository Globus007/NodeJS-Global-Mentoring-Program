import { json, Router } from 'express';
import { groupService } from '../services';
import { Group, GroupNotFoundError } from '../types';
import { GroupCreationAttributes } from '../db/models';
import { createValidator } from 'express-joi-validation';
import { GroupSchema } from '../schemas';

export const groupRouter = Router();
const validator = createValidator({});

groupRouter.get('/', async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).send(groups);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

groupRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const groups = await groupService.getGroupById(id);
    res.status(200).send(groups);
  } catch (e) {
    if (e instanceof GroupNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e.message);
  }
});

groupRouter.post('/', json(), validator.body(GroupSchema), async (req, res) => {
  const group: GroupCreationAttributes = req.body;
  try {
    const newGroup = await groupService.createGroup(group);
    res.status(201).send(newGroup);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

groupRouter.patch('/', json(), validator.body(GroupSchema), async (req, res) => {
  const fieldsToUpdate: Partial<Group> = req.body;
  const { id } = req.query;
  try {
    const group = await groupService.updateGroup(String(id), fieldsToUpdate);
    res.status(200).send(group);
  } catch (e) {
    if (e instanceof GroupNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e.message);
  }
});

groupRouter.delete('/', async (req, res) => {
  const { id } = req.query;
  try {
    await groupService.deleteGroup(String(id));
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof GroupNotFoundError) {
      return res.status(404).send(e.message);
    }
    res.status(500).send(e.message);
  }
});
