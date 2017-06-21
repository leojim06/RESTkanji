import * as Joi from 'joi';

export default {
  createAbrev: {
    body: {
      abrev: Joi.string().required(),
      meaning: Joi.string().required(),
    },
  },
  updateAbrev: {
    body: {
      abrev: Joi.string(),
      meaning: Joi.string(),
    },
  },
};