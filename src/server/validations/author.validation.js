import { Joi } from 'express-validation';

const authorValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      firstName: Joi.string().max(255),
      lastName: Joi.string().max(255),
      age: Joi.number().integer().max(200).min(1),
    }),
  },
  create: {
    body: Joi.object({
      firstName: Joi.string().max(255).required(),
      lastName: Joi.string().max(255),
      age: Joi.number().integer().max(200).min(1).required(),
      books: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      firstName: Joi.string().max(255).required(),
      lastName: Joi.string().max(255).required(),
      age: Joi.number().integer().max(200).min(1).required(),
      books: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      firstName: Joi.string().max(255),
      lastName: Joi.string().max(255),
      age: Joi.number().integer().max(200).min(1),
      books: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { authorValidation };
