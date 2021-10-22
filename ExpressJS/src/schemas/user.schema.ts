import Joi from 'joi';

export const UserSchema = Joi.object({
  id: Joi.string().required(),

  login: Joi.string().required(),

  password: Joi.string()
    .regex(/\d/, '"must contain at least one number"')
    .regex(/[A-Za-z]/, '"must contain at least one letter"')
    .required(),

  age: Joi.number().integer().min(4).max(130).required(),

  isDeleted: Joi.boolean().required(),
});
