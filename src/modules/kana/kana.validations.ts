import * as Joi from 'joi';

export default {
   createKana: {
      body: {
         symbol: Joi.string().required(),
         strokes: Joi.number().positive().integer().required(),
         shape: Joi.string().allow('Hiragana', 'Katakana').required(),
      }
   }
}