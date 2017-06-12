import * as Joi from 'joi';

export default {
   createKaji: {
      body: {
         kanji: Joi.string().required(),
         KAC: Joi.number().positive().integer().required(),
         radical: Joi.string().required(),
         strokes: Joi.number().positive().integer().required(),
         level: Joi.number().positive().integer().required(),
         kunYomi: {
            meaning: Joi.array().required(),
            reading: Joi.array().required(),
         },
         onYomi: {
            meaning: Joi.array().required(),
            reading: Joi.array().required(),
         },
      },
   },
   updateKaji: {
      body: {
         kanji: Joi.string(),
         KAC: Joi.number().positive().integer(),
         radical: Joi.string(),
         strokes: Joi.number().positive().integer(),
         level: Joi.number().positive().integer(),
         kunYomi: {
            meaning: Joi.forbidden(),
            reading: Joi.forbidden(),
         },
         onYomi: {
            meaning: Joi.forbidden(),
            reading: Joi.forbidden(),
         },
         dictionary: Joi.forbidden(),
      },
   },
};