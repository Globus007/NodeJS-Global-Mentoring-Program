import Joi from 'joi';

export const UserGroupSchema = Joi.object({
  groupId: Joi.string().required(),
  userIds: Joi.array().items(Joi.string()),
});
