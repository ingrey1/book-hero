import { Joi } from 'express-validation';

const bookValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      title: Joi.string().max(255),
      about: Joi.string().max(2550),
    }),
  },
  create: {
    body: Joi.object({
      title: Joi.string().max(255).required(),
      about: Joi.string().max(2550).required(),
      authors: Joi.array().items(Joi.number().integer()).default([]),
      genres: Joi.array().items(Joi.number().integer()).default([]),
      tags: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      title: Joi.string().max(255).required(),
      about: Joi.string().max(2550).required(),
      authors: Joi.array().items(Joi.number().integer()).default([]),
      genres: Joi.array().items(Joi.number().integer()).default([]),
      tags: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      title: Joi.string().max(255),
      about: Joi.string().max(2550),
      authors: Joi.array().items(Joi.number().integer()).default([]),
      genres: Joi.array().items(Joi.number().integer()).default([]),
      tags: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { bookValidation };
