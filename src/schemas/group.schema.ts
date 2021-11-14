import Joi from 'joi';
import { getPermissionValues } from '../utils';

export const GroupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid(...getPermissionValues())),
});
