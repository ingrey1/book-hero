import { Joi } from 'express-validation';

const genreValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      name: Joi.string().max(255),
      description: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      name: Joi.string().max(255).required(),
      description: Joi.string().max(255).required(),
      books: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255).required(),
      description: Joi.string().max(255).required(),
      books: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255),
      description: Joi.string().max(255),
      books: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { genreValidation };
