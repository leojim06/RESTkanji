import * as Joi from 'joi';

export default {
   createWord: {
      body: {
         word: Joi.string().required(),
         reading: Joi.string().required(),
         meaning: Joi.array().required(),
         abrev: Joi.array(),
      },
   },
   updateWord: {
      body: {
         word: Joi.string(),
         reading: Joi.string(),
         meaning: Joi.array(),
         abrev: Joi.forbidden(),
      },
   }
}